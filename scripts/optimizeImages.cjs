const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const { PrismaClient } = require('@prisma/client');

console.log('🚀 Iniciando Optimizador de Imágenes de Capa Cero V2 en Multinegocio...');

const prisma = new PrismaClient();
const PUBLIC_IMG_DIR = path.resolve(__dirname, '../public/images/optimized');

if (!fs.existsSync(PUBLIC_IMG_DIR)) fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

// Función central para descargar, reducir y convertir a WebP cualquier URL válida
async function downloadAndOptimize(url) {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('/')) return url; // Ya es local

    try {
        const hash = crypto.createHash('md5').update(url).digest('hex');
        const optimizedFilename = `${hash}.webp`;
        const filePath = path.join(PUBLIC_IMG_DIR, optimizedFilename);
        const webPath = `/images/optimized/${optimizedFilename}`;

        if (fs.existsSync(filePath)) {
            console.log(`⚡ Ya estaba optimizada (Cache): ${webPath}`);
            return webPath;
        }

        console.log(`⬇️ Descargando imagen original desde: ${url}`);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`🔴 Error descargando imagen: ${response.statusText}`);
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convertimos a WebP, resolucion máxima 1200px (suficiente para Desktop/Mobile sin pesar)
        await sharp(buffer)
            .resize(1200, null, { withoutEnlargement: true }) 
            .webp({ quality: 80 })
            .toFile(filePath);

        console.log(`✅ ¡Optimizada y Guardada en local! Ruta final: ${webPath}`);
        return webPath;
    } catch (e) {
        console.error(`❌ Falló la optimización de ${url}. Usando la URL original por seguridad. Error:`, e.message);
        return url; 
    }
}

async function run() {
    try {
        const modules = await prisma.module.findMany();
        let updatedCount = 0;

        for (const mod of modules) {
            let config = mod.config;
            let dirty = false;
            
            // Bloque Hero y genéricos
            if (config.imageUrl && config.imageUrl.startsWith('http')) {
                config.imageUrl = await downloadAndOptimize(config.imageUrl);
                dirty = true;
            }
            if (config.backgroundImageUrl && config.backgroundImageUrl.startsWith('http')) {
                config.backgroundImageUrl = await downloadAndOptimize(config.backgroundImageUrl);
                dirty = true;
            }

            // Bloque Equipo (Members)
            if (Array.isArray(config.members)) {
                for (let i = 0; i < config.members.length; i++) {
                    if (config.members[i].imageUrl && config.members[i].imageUrl.startsWith('http')) {
                        config.members[i].imageUrl = await downloadAndOptimize(config.members[i].imageUrl);
                        dirty = true;
                    }
                }
            }

            // Bloque Galería (Images)
            if (Array.isArray(config.images)) {
                for (let i = 0; i < config.images.length; i++) {
                    if (config.images[i].url && config.images[i].url.startsWith('http')) {
                        config.images[i].url = await downloadAndOptimize(config.images[i].url);
                        dirty = true;
                    }
                }
            }

            if (dirty) {
                // Reescribir en la DB para que en vivo los clientes carguen el \`webp\` ultra rápido
                await prisma.module.update({
                    where: { id: mod.id },
                    data: { config }
                });
                updatedCount++;
            }
        }
        
        console.log(`\n✨ ¡Compilación y optimización visual de Multinegocio Finalizada! Mapeos editados: ${updatedCount}`);
    } catch(err) {
        console.error('Lamentable error crítico en el Optimizador de Vercel:', err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

run();
