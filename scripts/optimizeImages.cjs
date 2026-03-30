const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const { PrismaClient } = require('@prisma/client');

console.log('🚀 Iniciando Optimizador de Imágenes V3 (con soporte GIF persistente)...');

const prisma = new PrismaClient();
const PUBLIC_IMG_DIR = path.resolve(__dirname, '../public/images/optimized');

if (!fs.existsSync(PUBLIC_IMG_DIR)) fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

/**
 * Descarga y optimiza una imagen desde una URL externa.
 * - GIFs: se guardan sin alterar (preserva la animación)
 * - Resto: se convierte a WebP con calidad 80 y máx 1200px
 * 
 * Retorna la ruta local resultante, o la URL original si falla.
 */
async function downloadAndOptimize(srcUrl) {
    if (!srcUrl || typeof srcUrl !== 'string') return srcUrl;
    if (!srcUrl.startsWith('http')) return srcUrl; // Ya es local o ruta inválida

    try {
        const hash = crypto.createHash('md5').update(srcUrl).digest('hex');
        const webpPath = path.join(PUBLIC_IMG_DIR, `${hash}.webp`);
        const gifPath  = path.join(PUBLIC_IMG_DIR, `${hash}.gif`);

        // Cache: si el archivo ya existe en disco, devolverlo directamente
        if (fs.existsSync(gifPath)) {
            console.log(`⚡ Cache GIF: /images/optimized/${hash}.gif`);
            return `/images/optimized/${hash}.gif`;
        }
        if (fs.existsSync(webpPath)) {
            console.log(`⚡ Cache WebP: /images/optimized/${hash}.webp`);
            return `/images/optimized/${hash}.webp`;
        }

        console.log(`⬇️  Descargando: ${srcUrl}`);
        const response = await fetch(srcUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);

        const buffer = Buffer.from(await response.arrayBuffer());
        const metadata = await sharp(buffer).metadata();

        if (metadata.format === 'gif') {
            fs.writeFileSync(gifPath, buffer);
            console.log(`🎨 GIF guardado: /images/optimized/${hash}.gif`);
            return `/images/optimized/${hash}.gif`;
        } else {
            await sharp(buffer)
                .resize(1200, null, { withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(webpPath);
            console.log(`✅ WebP guardado: /images/optimized/${hash}.webp`);
            return `/images/optimized/${hash}.webp`;
        }
    } catch (e) {
        console.error(`❌ Error optimizando ${srcUrl}:`, e.message);
        return srcUrl; // Fallback seguro: devolver URL original
    }
}

/**
 * Procesa un campo de URL dentro de un config.
 * 
 * La clave de la solución al bug de Vercel:
 * - Guardamos la URL original en `{field}_src` la primera vez que procesamos.
 * - En builds posteriores, si la ruta local ya no existe en disco, usamos `{field}_src`
 *   para re-descargar la imagen desde el origen.
 * 
 * @param {object} config  - El objeto config del módulo
 * @param {string} field   - El nombre del campo (ej: 'imageUrl', 'backgroundImageUrl')
 * @returns {boolean}       - true si el config fue modificado
 */
async function processField(config, field) {
    const url = config[field];
    if (!url) return false;

    const srcField = `${field}_src`; // Campo donde guardamos la URL original

    // Si es una ruta local, comprobar si el archivo existe en disco
    if (url.startsWith('/')) {
        const absolutePath = path.resolve(__dirname, '../public', url.slice(1));
        if (fs.existsSync(absolutePath)) {
            return false; // Existe en disco → no hacer nada
        }

        // El archivo local no existe (Vercel lo borró en el deploy anterior).
        // Intentar re-descargar usando la URL original guardada en {field}_src.
        const originalSrc = config[srcField];
        if (originalSrc && originalSrc.startsWith('http')) {
            console.log(`🔄 Re-descargando ${field} (archivo local perdido): ${originalSrc}`);
            const localPath = await downloadAndOptimize(originalSrc);
            if (localPath !== config[field]) {
                config[field] = localPath;
                return true;
            }
        } else {
            console.log(`⚠️  Archivo local perdido y sin URL de origen guardada para: ${url}`);
        }
        return false;
    }

    // Es URL externa: descargar, optimizar y guardar también la URL original
    if (url.startsWith('http')) {
        // Guardar la URL original antes de transformarla
        config[srcField] = url;
        const localPath = await downloadAndOptimize(url);
        if (localPath !== url) {
            config[field] = localPath;
            return true;
        }
    }

    return false;
}

async function run() {
    try {
        const modules = await prisma.module.findMany();
        let updatedCount = 0;

        for (const mod of modules) {
            let config = mod.config;
            let dirty = false;

            // Campos simples de URL
            for (const field of ['imageUrl', 'backgroundImageUrl']) {
                if (await processField(config, field)) dirty = true;
            }

            // Bloque Equipo (Members)
            if (Array.isArray(config.members)) {
                for (const member of config.members) {
                    if (await processField(member, 'imageUrl')) dirty = true;
                }
            }

            // Bloque Galería (Images)
            if (Array.isArray(config.images)) {
                for (const img of config.images) {
                    if (await processField(img, 'url')) dirty = true;
                }
            }

            if (dirty) {
                await prisma.module.update({
                    where: { id: mod.id },
                    data: { config }
                });
                updatedCount++;
                console.log(`💾 Módulo actualizado: ${mod.id} (${mod.type})`);
            }
        }

        console.log(`\n✨ Optimización finalizada. Módulos actualizados: ${updatedCount}`);
    } catch (err) {
        console.error('❌ Error crítico en el optimizador:', err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

run();
