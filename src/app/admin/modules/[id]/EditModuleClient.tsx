"use client"

import { useState, useTransition } from "react"
import { updateModuleConfig } from "../actions"
import { useRouter } from "next/navigation"

// ─── Sección reutilizable de Color + Decoración + Tipografía ──────────────────
function StyleSection({ config, onChange }: { config: any; onChange: (key: string, val: any) => void }) {
  return (
    <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🎨 Estilo y Tamaño</h4>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[9px] font-bold uppercase tracking-widest border border-purple-500/30">Personalización Pro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Color de fondo</label>
          <p className="text-[10px] text-zinc-600 mb-2">Define el color principal de esta sección. Haz clic en el cuadro para abrir el selector.</p>
          <div className="flex gap-3 items-center">
            <input type="color" value={config.color || '#18181b'} onChange={e => onChange('color', e.target.value)}
              className="w-14 h-14 p-1 rounded-xl cursor-pointer bg-zinc-950 border border-zinc-800 shrink-0 hover:scale-105 transition-transform" />
            <input type="text" value={config.color || '#18181b'} onChange={e => onChange('color', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white uppercase font-mono tracking-widest text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Espaciado Vertical</label>
          <p className="text-[10px] text-zinc-600 mb-2">Controla el espacio vacío (aire) por arriba y abajo de esta sección para separarla de las demás.</p>
          <select value={config.paddingY || 'md'} onChange={e => onChange('paddingY', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
            <option value="none">Sin Espaciado (0px)</option>
            <option value="xs">Mínimo (Muy estrecho)</option>
            <option value="sm">Pequeño (Compacto)</option>
            <option value="md">Normal (Equilibrado)</option>
            <option value="lg">Grande (Espacioso)</option>
            <option value="xl">Gigante (Hero-style)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Ancho de Contenido</label>
          <p className="text-[10px] text-zinc-600 mb-2">Define cuánto espacio horizontal ocupa el contenido. "Pantalla Completa" elimina márgenes laterales.</p>
          <select value={config.maxWidth || 'md'} onChange={e => onChange('maxWidth', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
            <option value="sm">Estrecho (Lectura cómoda)</option>
            <option value="md">Estándar (Recomendado)</option>
            <option value="lg">Ancho (Más contenido visible)</option>
            <option value="xl">Extra ancho</option>
            <option value="full">Pantalla Completa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-1">✨ Decoración de Fondo</label>
          <p className="text-[10px] text-zinc-600 mb-2">Añade un efecto visual decorativo detrás del contenido para darle personalidad.</p>
          <select value={config.decoration || 'none'} onChange={e => onChange('decoration', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
            <option value="none">Ninguna (Liso)</option>
            <option value="waves">Olas suaves</option>
            <option value="blob">Burbuja abstracta</option>
            <option value="grid">Cuadrícula técnica</option>
          </select>
        </div>
      </div>

      {/* ── Tipografía ── */}
      <div className="border-t border-zinc-800 pt-6">
        <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-1">🔤 Tipografía</h4>
        <p className="text-[10px] text-zinc-600 mb-4">Controla el tamaño de las letras en esta sección. Los tamaños son responsive (se adaptan en móvil).</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Tamaño del Título</label>
            <p className="text-[10px] text-zinc-600 mb-2">El encabezado principal de esta sección.</p>
            <select value={config.titleSize || 'lg'} onChange={e => onChange('titleSize', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="xs">XS — Muy pequeño</option>
              <option value="sm">S — Pequeño</option>
              <option value="md">M — Mediano</option>
              <option value="lg">L — Grande (Recomendado)</option>
              <option value="xl">XL — Muy grande</option>
              <option value="2xl">2XL — Impacto máximo</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Tamaño del Subtítulo</label>
            <p className="text-[10px] text-zinc-600 mb-2">Texto secundario debajo del título.</p>
            <select value={config.subtitleSize || 'md'} onChange={e => onChange('subtitleSize', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="xs">XS — Muy pequeño</option>
              <option value="sm">S — Pequeño</option>
              <option value="md">M — Mediano (Recomendado)</option>
              <option value="lg">L — Grande</option>
              <option value="xl">XL — Muy grande</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Tamaño del Cuerpo</label>
            <p className="text-[10px] text-zinc-600 mb-2">Texto de párrafos, descripciones y contenido general.</p>
            <select value={config.bodySize || 'md'} onChange={e => onChange('bodySize', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="xs">XS — Muy pequeño</option>
              <option value="sm">S — Pequeño</option>
              <option value="md">M — Mediano (Recomendado)</option>
              <option value="lg">L — Grande</option>
              <option value="xl">XL — Muy grande</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Familia Tipográfica y Estilo ── */}
      <div className="border-t border-zinc-800 pt-6">
        <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-1">✍️ Fuente y Estilo</h4>
        <p className="text-[10px] text-zinc-600 mb-4">Elige la familia tipográfica y el peso visual del texto en esta sección.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Familia de Fuente</label>
            <p className="text-[10px] text-zinc-600 mb-2">El "tipo de letra" que se usará en títulos y textos.</p>
            <select value={config.fontFamily || 'sans'} onChange={e => onChange('fontFamily', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="sans">Sans-Serif (Moderna, limpia)</option>
              <option value="serif">Serif (Clásica, elegante)</option>
              <option value="mono">Monoespaciada (Técnica)</option>
              <option value="inter">Inter (Premium)</option>
              <option value="playfair">Playfair Display (Lujo)</option>
              <option value="montserrat">Montserrat (Geométrica)</option>
              <option value="roboto">Roboto (Google estándar)</option>
              <option value="outfit">Outfit (Moderna redondeada)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Peso del Título</label>
            <p className="text-[10px] text-zinc-600 mb-2">Controla lo "grueso" o fino que se ve el título.</p>
            <select value={config.titleWeight || 'black'} onChange={e => onChange('titleWeight', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="light">Light — Fino y elegante</option>
              <option value="normal">Normal — Estándar</option>
              <option value="semibold">Semibold — Semi-negrita</option>
              <option value="bold">Bold — Negrita</option>
              <option value="extrabold">Extrabold — Muy negrita</option>
              <option value="black">Black — Ultra negrita (Recomendado)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Estilo del Título</label>
            <p className="text-[10px] text-zinc-600 mb-2">Normal o inclinado (cursiva/itálica).</p>
            <select value={config.titleStyle || 'normal'} onChange={e => onChange('titleStyle', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="normal">Normal (Recto)</option>
              <option value="italic">Cursiva (Itálica)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Alto Mínimo del Módulo ── */}
      <div className="border-t border-zinc-800 pt-6">
        <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-1">📐 Dimensiones del Módulo</h4>
        <p className="text-[10px] text-zinc-600 mb-4">Controla la altura mínima de esta sección completa.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Alto Mínimo</label>
            <p className="text-[10px] text-zinc-600 mb-2">Define cuánto ocupa verticalmente esta sección como mínimo. "Auto" se adapta al contenido.</p>
            <select value={config.minHeight || 'auto'} onChange={e => onChange('minHeight', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="auto">Auto (Se adapta al contenido)</option>
              <option value="sm">Bajo (300px)</option>
              <option value="md">Medio (500px)</option>
              <option value="lg">Alto (700px)</option>
              <option value="xl">Muy alto (100% pantalla)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1">Separación Inferior Extra</label>
            <p className="text-[10px] text-zinc-600 mb-2">Añade espacio extra entre este módulo y el siguiente. Útil para dar "aire" visual.</p>
            <select value={config.marginBottom || 'none'} onChange={e => onChange('marginBottom', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold">
              <option value="none">Sin separación extra</option>
              <option value="sm">Pequeña (16px)</option>
              <option value="md">Media (32px)</option>
              <option value="lg">Grande (64px)</option>
              <option value="xl">Muy grande (96px)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Helpers para listas dinámicas ────────────────────────────────────────────
function useArrayHelpers(config: any, setConfig: React.Dispatch<React.SetStateAction<any>>) {
  const handleArrayChange = (arrayName: string, index: number, field: string, value: any) => {
    const newArray = [...(config[arrayName] || [])]
    newArray[index] = { ...newArray[index], [field]: value }
    setConfig((prev: any) => ({ ...prev, [arrayName]: newArray }))
  }
  const addArrayItem = (arrayName: string, defaultItem: any) => {
    const newArray = [...(config[arrayName] || []), { id: Math.random().toString(36).slice(2), ...defaultItem }]
    setConfig((prev: any) => ({ ...prev, [arrayName]: newArray }))
  }
  const removeArrayItem = (arrayName: string, index: number) => {
    const newArray = [...(config[arrayName] || [])]
    newArray.splice(index, 1)
    setConfig((prev: any) => ({ ...prev, [arrayName]: newArray }))
  }

  const handleDayIntervalChange = (dayIdx: number, subIdx: number, key: string, val: any) => {
    const days = [...(config.days || [])]
    const intervals = [...(days[dayIdx].intervals || [])]
    intervals[subIdx] = { ...intervals[subIdx], [key]: val }
    days[dayIdx].intervals = intervals
    setConfig((prev: any) => ({ ...prev, days }))
  }

  const addDayInterval = (dayIdx: number) => {
    const days = [...(config.days || [])]
    const existing = days[dayIdx].intervals || []
    days[dayIdx].intervals = [...existing, { open: '09:00', close: '14:00' }]
    setConfig((prev: any) => ({ ...prev, days }))
  }

  const removeDayInterval = (dayIdx: number, subIdx: number) => {
    const days = [...(config.days || [])]
    const intervals = [...(days[dayIdx].intervals || [])]
    intervals.splice(subIdx, 1)
    days[dayIdx].intervals = intervals
    setConfig((prev: any) => ({ ...prev, days }))
  }

  return { handleArrayChange, addArrayItem, removeArrayItem, handleDayIntervalChange, addDayInterval, removeDayInterval }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function EditModuleClient({ mod, initialSettings }: { mod: any; initialSettings?: any }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [config, setConfig] = useState<any>(mod.config || {})
 
  const { handleArrayChange, addArrayItem, removeArrayItem, handleDayIntervalChange, addDayInterval, removeDayInterval } = useArrayHelpers(config, setConfig)
  const set = (key: string, val: any) => setConfig((prev: any) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    startTransition(async () => {
      await updateModuleConfig(mod.id, config)
      router.refresh()
      alert("¡Cambios guardados con éxito! 🎉 Vercel está ahora optimizando y descargando tus imágenes (El Rebuild tardará ~1 minuto en vivo).")
    })
  }

  return (
    <div className="space-y-8 pb-32">

      {/* ══════════════════════════════════════════════
          NAVBAR (Cabecera)
      ══════════════════════════════════════════════ */}
      {mod.type === 'navbar' && (
        <div className="space-y-6">
          <div className="p-6 bg-purple-900/10 border border-purple-500/30 rounded-2xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-purple-400 text-sm uppercase tracking-widest flex items-center gap-2">🌈 Marca Global (Estilo Maestro)</h4>
              <label className="relative inline-flex items-center cursor-pointer gap-2">
                <input type="checkbox" className="sr-only peer" checked={config.brand?.applyGlobal ?? false} 
                  onChange={e => set('brand', { ...(config.brand || {}), applyGlobal: e.target.checked })} />
                <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                <span className="text-[10px] text-zinc-400 uppercase font-black">Aplicar a toda la web</span>
              </label>
            </div>
            <p className="text-[11px] text-zinc-500">Define los colores principales de tu marca aquí. Si activas "Aplicar a toda la web", todos los módulos se unificarán visualmente.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { k: 'primary',    l: 'Primario',     d: 'Botones y Acentos' },
                { k: 'secondary',  l: 'Secundario',   d: 'Elementos suaves' },
                { k: 'accent',     l: 'Acento',       d: 'Detalles brillantes' },
                { k: 'background', l: 'Fondo Base',   d: 'Color de la web' }
              ].map(item => (
                <div key={item.k}>
                  <label className="block text-[10px] text-zinc-400 mb-1 uppercase font-bold">{item.l}</label>
                  <div className="flex flex-col gap-2">
                    <input type="color" value={config.brand?.[item.k] || '#000'} 
                      onChange={e => set('brand', { ...(config.brand || {}), [item.k]: e.target.value })} 
                      className="w-full h-10 rounded-xl cursor-pointer bg-zinc-950 border border-zinc-800" />
                    <input type="text" value={config.brand?.[item.k] || '#000'} 
                      onChange={e => set('brand', { ...(config.brand || {}), [item.k]: e.target.value })} 
                      className="w-full px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-[10px] uppercase text-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🏷️ Logotipo y Identidad</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={config.showLogo ?? true} onChange={e => set('showLogo', e.target.checked)} className="w-5 h-5 rounded accent-purple-500" />
                  <span className="text-sm text-white font-medium">Mostrar Logotipo en la barra</span>
                </label>
                <input type="text" value={config.logoText || ''} onChange={e => set('logoText', e.target.value)} placeholder="Nombre de tu negocio" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black text-lg" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-zinc-500 uppercase font-bold">Tamaño Visual</label>
                <div className="grid grid-cols-3 gap-2">
                  {['sm', 'md', 'lg'].map(s => (
                    <button key={s} onClick={() => set('logoSize', s)} className={`py-2 text-xs font-bold rounded-xl border transition-all ${config.logoSize === s ? 'bg-purple-600 border-purple-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}>
                      {s === 'sm' ? 'Pequeño' : s === 'md' ? 'Mediano' : 'Grande'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <div className="flex justify-between items-center">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🔗 Enlaces de Navegación</h4>
              <button onClick={() => addArrayItem('links', { label: 'Nuevo Enlace', url: '#', openNewTab: false })}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-xl transition border border-zinc-700">+ Añadir Enlace</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(config.links || []).map((link: any, idx: number) => (
                <div key={link.id || idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl relative group shadow-lg">
                  <button onClick={() => removeArrayItem('links', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  <div className="space-y-3">
                    <input type="text" value={link.label || ''} onChange={e => handleArrayChange('links', idx, 'label', e.target.value)} placeholder="Etiqueta" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-white text-sm font-bold" />
                    <input type="text" value={link.url || ''} onChange={e => handleArrayChange('links', idx, 'url', e.target.value)} placeholder="URL (#seccion)" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-zinc-400 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ANNOUNCEMENT
      ══════════════════════════════════════════════ */}
      {mod.type === 'announcement' && (
        <div className="space-y-6">
           <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📢 Mensaje Importante</h4>
              <textarea value={config.text || ''} onChange={e => set('text', e.target.value)} placeholder="¡Gran liquidación este viernes! 🎉" rows={3} className="w-full px-4 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-white font-medium shadow-inner" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <input type="text" value={config.linkText || ''} onChange={e => set('linkText', e.target.value)} placeholder="Texto del enlace (Opcional)" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm" />
                 <input type="text" value={config.link || ''} onChange={e => set('link', e.target.value)} placeholder="URL destino" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm" />
              </div>
           </div>
           <StyleSection config={config} onChange={set} />
        </div>
      )}

      {/* ══════════════════════════════════════════════
          HERO (Portada Principal)
      ══════════════════════════════════════════════ */}
      {mod.type === 'hero' && (
        <div className="space-y-6">
          <div className="p-1 pl-6 bg-gradient-to-r from-purple-600/20 to-transparent border-l-4 border-purple-500 py-4 mb-4">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Transforma tu primera impresión</h3>
          </div>
          <StyleSection config={config} onChange={set} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Textos Maestros</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Etiqueta Superior (Badge)</label>
                  <input type="text" value={config.preTitleBadge || ''} onChange={e => set('preTitleBadge', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-purple-400 font-bold" placeholder="✨ NUEVO SERVICIO" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Título de alto impacto</label>
                  <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black text-xl" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Descripción detallada</label>
                  <textarea rows={4} value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className="w-full px-4 py-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white/70 text-sm resize-none" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🖼️ Imagen y Diseño</h4>
               <div className="space-y-4">
                 <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">URL Imagen de fondo</label>
                   <input type="text" value={config.backgroundImageUrl || ''} onChange={e => set('backgroundImageUrl', e.target.value)} placeholder="https://unsplash.com/..." className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-[10px]" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Opacidad Capa</label>
                     <input type="range" min="0" max="1" step="0.05" value={config.imageOverlayOpacity ?? 0.5} onChange={e => set('imageOverlayOpacity', parseFloat(e.target.value))} className="w-full h-8 accent-purple-500 mt-2" />
                     <div className="text-center text-[10px] text-zinc-500">{Math.round((config.imageOverlayOpacity || 0.5) * 100)}% Oscuridad</div>
                   </div>
                   <div>
                     <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Alineación</label>
                     <select value={config.textAlign || 'center'} onChange={e => set('textAlign', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs mt-2">
                       <option value="left">Izquierda</option>
                       <option value="center">Centro</option>
                       <option value="right">Derecha</option>
                     </select>
                   </div>
                 </div>
               </div>
               <div className="pt-4 border-t border-zinc-800">
                 <div className="flex justify-between items-center mb-4">
                    <h5 className="text-[10px] text-zinc-500 uppercase font-black">Botones de Llamada a la Acción</h5>
                    <button onClick={() => addArrayItem('buttons', { text: 'Saber más', url: '#', style: 'primary' })} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700 text-white font-bold">+ Botón</button>
                 </div>
                 <div className="space-y-3">
                   {(config.buttons || []).map((btn: any, idx: number) => (
                      <div key={idx} className="flex gap-2 items-center bg-black/40 p-2 rounded-xl border border-zinc-800">
                        <input type="text" value={btn.text} onChange={e => handleArrayChange('buttons', idx, 'text', e.target.value)} placeholder="Texto" className="w-1/3 px-2 py-1 bg-transparent text-white text-[10px] font-bold border-r border-zinc-800" />
                        <input type="text" value={btn.url} onChange={e => handleArrayChange('buttons', idx, 'url', e.target.value)} placeholder="URL" className="flex-1 px-2 py-1 bg-transparent text-zinc-500 text-[10px]" />
                        <select value={btn.style} onChange={e => handleArrayChange('buttons', idx, 'style', e.target.value)} className="bg-transparent text-[9px] text-purple-400 font-bold outline-none">
                          <option value="primary">Primario</option>
                          <option value="outline">Borde</option>
                          <option value="ghost">Limpio</option>
                        </select>
                        <button onClick={() => removeArrayItem('buttons', idx)} className="text-zinc-700 hover:text-red-500 px-1">✕</button>
                      </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          FEATURES (Servicios / Beneficios)
      ══════════════════════════════════════════════ */}
      {mod.type === 'features' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Encabezado</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Título: Nuestros Servicios" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
              <input type="text" value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} placeholder="Subtítulo corto opcional" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Nº Columnas (PC)</label>
                <select value={config.columns || 3} onChange={e => set('columns', parseInt(e.target.value))} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs">
                  <option value={2}>2 Columnas</option>
                  <option value={3}>3 Columnas</option>
                  <option value={4}>4 Columnas</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Estilo Visual</label>
                <select value={config.cardStyle || 'glass'} onChange={e => set('cardStyle', e.target.value)} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs">
                  <option value="glass">Cristal (Elegante)</option>
                  <option value="clean">Moderno (Limpio)</option>
                  <option value="bordered">Clásico (Bordes)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
             <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🃏 Tarjetas de Servicios</h4>
                <button onClick={() => addArrayItem('cards', { emoji: '✨', title: 'Nuevo Servicio', subtitle: 'Precio/Detalle', paragraphs: ['Explica qué ofreces aquí...'] })} className="text-xs bg-cyan-700 px-4 py-2 rounded-xl text-white font-bold">+ Nuevo Servicio</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {(config.cards || []).map((card: any, idx: number) => (
                 <div key={card.id || idx} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl relative group shadow-2xl hover:border-cyan-500/30 transition-all">
                    <button onClick={() => removeArrayItem('cards', idx)} className="absolute top-3 right-3 text-zinc-700 hover:text-red-500 transition-colors">✕</button>
                    <div className="flex gap-4 mb-4">
                       <div className="w-16 h-16 shrink-0 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-3xl">
                         <input type="text" value={card.emoji} onChange={e => handleArrayChange('cards', idx, 'emoji', e.target.value)} className="w-full bg-transparent text-center focus:outline-none" />
                       </div>
                       <div className="flex-1 space-y-2">
                         <input type="text" value={card.title} onChange={e => handleArrayChange('cards', idx, 'title', e.target.value)} placeholder="Título" className="w-full bg-transparent text-white font-black text-lg focus:border-b border-purple-500" />
                         <input type="text" value={card.subtitle} onChange={e => handleArrayChange('cards', idx, 'subtitle', e.target.value)} placeholder="Subtítulo / Precio" className="w-full bg-transparent text-purple-400 text-xs font-bold uppercase tracking-widest" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       {card.paragraphs?.map((p: string, pIdx: number) => (
                         <div key={pIdx} className="flex gap-2">
                            <textarea value={p} onChange={e => {
                               const newCards = [...config.cards]; newCards[idx].paragraphs[pIdx] = e.target.value; set('cards', newCards)
                            }} rows={2} className="w-full bg-black/40 border border-zinc-800 rounded-xl px-3 py-2 text-white/70 text-[11px] resize-none" />
                            {card.paragraphs.length > 1 && (
                              <button onClick={() => {
                                const newCards = [...config.cards]; newCards[idx].paragraphs.splice(pIdx, 1); set('cards', newCards)
                              }} className="text-zinc-800 hover:text-red-500">✕</button>
                            )}
                         </div>
                       ))}
                       <button onClick={() => {
                          const newCards = [...config.cards]; newCards[idx].paragraphs = [...(newCards[idx].paragraphs || []), '']; set('cards', newCards)
                       }} className="w-full py-1.5 border border-zinc-800 border-dashed rounded-lg text-[10px] text-zinc-600 hover:text-zinc-400">+ Añadir Párrafo</button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PRICING (Tarifas)
      ══════════════════════════════════════════════ */}
      {mod.type === 'pricing' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 font-black uppercase">Título Sección</label>
                   <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
                </div>
                <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 font-black uppercase">Moneda</label>
                   <input type="text" value={config.currency || '€'} onChange={e => set('currency', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400 font-black text-center" />
                </div>
             </div>
          </div>
          
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">💰 Categorías de Precios</h4>
                <button onClick={() => addArrayItem('categories', { name: 'Nueva Categoría', items: [{ name: 'Ejemplo', price: '10', description: 'Opcional' }] })} className="text-xs bg-emerald-700 px-4 py-2 rounded-xl text-white font-bold">+ Añadir Categoría</button>
             </div>
             {(config.categories || []).map((cat: any, cIdx: number) => (
                <div key={cat.id || cIdx} className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl relative space-y-4 shadow-2xl">
                   <button onClick={() => removeArrayItem('categories', cIdx)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500">✕ Eliminar Categoría</button>
                   <div className="max-w-md">
                      <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Nombre de la Categoría</label>
                      <input type="text" value={cat.name} onChange={e => handleArrayChange('categories', cIdx, 'name', e.target.value)} className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-xl text-white font-black text-lg" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cat.items?.map((item: any, iIdx: number) => (
                        <div key={iIdx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex gap-3 group">
                           <div className="flex-1 space-y-2">
                              <input type="text" value={item.name} onChange={e => {
                                 const newCats = [...config.categories]; newCats[cIdx].items[iIdx].name = e.target.value; set('categories', newCats)
                              }} placeholder="Nombre" className="w-full bg-transparent text-white font-bold text-sm focus:border-b border-white/20" />
                              <input type="text" value={item.description} onChange={e => {
                                 const newCats = [...config.categories]; newCats[cIdx].items[iIdx].description = e.target.value; set('categories', newCats)
                              }} placeholder="Descripción" className="w-full bg-transparent text-zinc-500 text-[10px]" />
                           </div>
                           <div className="w-20 text-right">
                              <input type="text" value={item.price} onChange={e => {
                                 const newCats = [...config.categories]; newCats[cIdx].items[iIdx].price = e.target.value; set('categories', newCats)
                              }} className="w-full bg-zinc-800 text-white font-black text-center py-1 rounded-lg border border-zinc-700" />
                              <button onClick={() => {
                                 const newCats = [...config.categories]; newCats[cIdx].items.splice(iIdx, 1); set('categories', newCats)
                              }} className="text-[10px] text-red-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Eliminar</button>
                           </div>
                        </div>
                      ))}
                      <button onClick={() => {
                         const newCats = [...config.categories]; newCats[cIdx].items.push({ name: 'Nuevo', price: '0', description: '' }); set('categories', newCats)
                      }} className="p-4 border border-zinc-800 border-dashed rounded-2xl flex items-center justify-center text-xs text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400 transition-all">+ Añadir Item</button>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          GALLERY / TEAM / STATS
      ══════════════════════════════════════════════ */}
      {(mod.type === 'gallery' || mod.type === 'team' || mod.type === 'stats') && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Encabezado</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Título Principal" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
                <input type="text" value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} placeholder="Subtítulo corto" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400" />
             </div>
             {mod.type === 'gallery' && (
                <div className="w-48">
                   <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Nº de Columnas</label>
                   <select value={config.columns || 3} onChange={e => set('columns', parseInt(e.target.value))} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm">
                      <option value={2}>2 Columnas</option>
                      <option value={3}>3 Columnas</option>
                      <option value={4}>4 Columnas</option>
                   </select>
                </div>
             )}
          </div>

          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
             <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">{mod.type === 'gallery' ? '🖼️ Galería de Fotos' : mod.type === 'team' ? '👥 El Equipo' : '📊 Estadísticas'}</h4>
                <button onClick={() => addArrayItem(mod.type === 'gallery' ? 'images' : mod.type === 'team' ? 'members' : 'stats', 
                  mod.type === 'gallery' ? { url: '', alt: '' } : mod.type === 'team' ? { name: 'Nombre', role: 'Cargo', imageUrl: '', bio: 'Breve historia' } : { number: '100', label: 'Dato' })} 
                  className="text-xs bg-zinc-700 px-4 py-2 rounded-xl text-white font-bold shadow-lg">+ Añadir Nuevo</button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(config[mod.type === 'gallery' ? 'images' : mod.type === 'team' ? 'members' : 'stats'] || []).map((item: any, idx: number) => (
                   <div key={idx} className="p-5 bg-zinc-900 border border-zinc-800 rounded-3xl relative hover:border-purple-500/50 transition-all shadow-xl group">
                      <button onClick={() => removeArrayItem(mod.type === 'gallery' ? 'images' : mod.type === 'team' ? 'members' : 'stats', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      
                      {mod.type === 'gallery' && (
                        <div className="space-y-3">
                           <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 mb-3">
                              {item.url ? <img src={item.url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800 text-4xl">🖼️</div>}
                           </div>
                           <input type="text" value={item.url} onChange={e => handleArrayChange('images', idx, 'url', e.target.value)} placeholder="URL de la imagen" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-xl text-zinc-500 text-[10px]" />
                        </div>
                      )}

                      {mod.type === 'team' && (
                        <div className="space-y-4">
                           <div className="flex gap-4 items-center">
                              <div className="w-16 h-16 bg-zinc-800 rounded-2xl overflow-hidden border-2 border-zinc-700 shrink-0">
                                 {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>}
                              </div>
                              <div className="flex-1 space-y-1">
                                 <input type="text" value={item.name} onChange={e => handleArrayChange('members', idx, 'name', e.target.value)} placeholder="Nombre" className="w-full bg-transparent text-white font-black text-sm" />
                                 <input type="text" value={item.role} onChange={e => handleArrayChange('members', idx, 'role', e.target.value)} placeholder="Cargo" className="w-full bg-transparent text-purple-400 text-[10px] font-bold uppercase" />
                              </div>
                           </div>
                           <textarea value={item.bio} onChange={e => handleArrayChange('members', idx, 'bio', e.target.value)} placeholder="Biografía corta..." rows={3} className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-3 py-2 text-white/60 text-[10px] resize-none" />
                           <input type="text" value={item.imageUrl} onChange={e => handleArrayChange('members', idx, 'imageUrl', e.target.value)} placeholder="URL de la Foto" className="w-full bg-black border border-zinc-800 rounded-lg px-2 py-1 text-zinc-600 text-[9px]" />
                        </div>
                      )}

                      {mod.type === 'stats' && (
                        <div className="text-center space-y-2 py-4">
                           <input type="text" value={item.number} onChange={e => handleArrayChange('stats', idx, 'number', e.target.value)} className="w-full bg-transparent text-white font-black text-4xl text-center" />
                           <input type="text" value={item.label} onChange={e => handleArrayChange('stats', idx, 'label', e.target.value)} className="w-full bg-transparent text-zinc-500 text-xs text-center uppercase font-bold tracking-widest" />
                        </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          CONTACT (Mapa y Datos)
      ══════════════════════════════════════════════ */}
      {mod.type === 'contact' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          
          {/* Toggle de Sincronización */}
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-3xl flex items-center justify-between gap-6 shadow-[0_0_50px_rgba(124,58,237,0.1)]">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">💎</div>
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Vincular con Identidad de Marca</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Usa automáticamente los teléfonos, email, dirección y mapa configurados globalmente.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-125 mr-2">
              <input type="checkbox" className="sr-only peer" checked={config.useGlobalContact ?? true} onChange={e => set('useGlobalContact', e.target.checked)} />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full border border-zinc-700"></div>
            </label>
          </div>

          <div className="p-8 bg-zinc-950/40 border border-zinc-800 rounded-3xl space-y-8 relative overflow-hidden">
             <div className="flex items-center justify-between border-b border-zinc-800/50 pb-6">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-xs">📬</span>
                  Información de Contacto
                </h4>
                {config.useGlobalContact && <span className="text-[9px] bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse border border-purple-500/30">✨ Sincronizado</span>}
             </div>

             {config.useGlobalContact ? (
               /* VISTA PREVIA SINCRONIZADA */
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-80 py-4">
                  <div className="space-y-6">
                     <div className="space-y-1">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Email Corporativo</p>
                        <p className="text-white font-bold">{initialSettings?.contactEmail || 'No configurado'}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Teléfonos</p>
                        <div className="flex flex-wrap gap-3">
                           {(initialSettings?.contactPhones || []).length > 0 ? (initialSettings.contactPhones.map((p: string, i: number) => (
                             <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 text-xs font-mono">{p}</span>
                           ))) : <p className="text-zinc-500 italic text-xs">Sin teléfonos</p>}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Sede Física</p>
                        <p className="text-white font-bold">{initialSettings?.address || 'No configurado'}</p>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{initialSettings?.city} {initialSettings?.province} {initialSettings?.country}</p>
                     </div>
                  </div>
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-black flex items-center justify-center group">
                     {initialSettings?.locationMapUrl ? (
                        <iframe src={initialSettings.locationMapUrl} className="absolute inset-0 w-full h-full grayscale invert opacity-40 group-hover:opacity-60 transition-opacity" />
                     ) : <span className="text-4xl">🗺️</span>}
                     <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="text-[9px] text-zinc-500 font-black uppercase text-center tracking-widest">Mapa Sincronizado</p>
                     </div>
                  </div>
               </div>
             ) : (
               /* EDITOR MANUAL */
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Email Específico</label>
                        <input type="email" value={config.email || ''} onChange={e => set('email', e.target.value)} className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white font-bold focus:border-purple-500 outline-none transition-all" placeholder="sucursal@ejemplo.com" />
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between pl-1">
                          <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Números de Teléfono</label>
                          <button onClick={() => set('contactPhones', [...(config.contactPhones || []), ''])} className="text-[9px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-400 hover:text-white transition-all font-black uppercase">+ Añadir</button>
                        </div>
                        <div className="space-y-3">
                           {(config.contactPhones || []).map((p: string, i: number) => (
                             <div key={i} className="flex gap-2">
                               <input type="text" value={p} onChange={e => {
                                 const np = [...config.contactPhones]; np[i] = e.target.value; set('contactPhones', np)
                               }} className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-white text-xs font-mono" placeholder="+34 600..." />
                               <button onClick={() => {
                                 const np = [...config.contactPhones]; np.splice(i, 1); set('contactPhones', np)
                               }} className="px-3 text-zinc-700 hover:text-red-500 transition-colors">✕</button>
                             </div>
                           ))}
                           {(!config.contactPhones || config.contactPhones.length === 0) && (
                             <p className="text-[10px] text-zinc-700 italic">No hay teléfonos manuales.</p>
                           )}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Dirección Específica</label>
                        <input type="text" value={config.address || ''} onChange={e => set('address', e.target.value)} placeholder="Calle Falsa 123, Ciudad" className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white text-sm focus:border-purple-500 outline-none transition-all" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center pl-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Mapa de Google (Iframe Embed)</label>
                        <a href="https://www.google.com/maps" target="_blank" className="text-[9px] text-purple-400 underline italic uppercase font-black">Abrir Maps</a>
                     </div>
                     <textarea rows={8} value={config.mapEmbedUrl || ''} onChange={e => set('mapEmbedUrl', e.target.value)} placeholder="Pega aquí solo el 'src' del iframe de Google Maps" className="w-full px-5 py-5 bg-black/60 border border-zinc-800 rounded-3xl text-white text-[10px] font-mono resize-none focus:border-purple-500 outline-none transition-all shadow-inner" />
                  </div>
               </div>
             )}
          </div>

          <div className="p-8 bg-zinc-950/40 border border-zinc-800 rounded-3xl space-y-6">
             <div className="flex items-center justify-between pb-4 border-b border-zinc-800/50">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest flex items-center gap-3">
                   <span className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-xs">📱</span>
                   Redes Sociales del Módulo
                </h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={config.showSocials ?? true} onChange={e => set('showSocials', e.target.checked)} />
                  <div className="w-9 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full border border-zinc-600"></div>
                </label>
             </div>
             {config.showSocials && (
                <div className="space-y-6">
                   <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-white font-black uppercase tracking-widest">Vincular Socials con Marca</p>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold">Usa los enlaces de Instagram, TikTok, etc. configurados globalmente.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={config.useGlobalSocials ?? true} onChange={e => set('useGlobalSocials', e.target.checked)} />
                        <div className="w-8 h-4 bg-zinc-800 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                   </div>
                   
                   {!config.useGlobalSocials && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
                         {['Instagram','Facebook','TikTok','Twitter'].map(s => (
                           <div key={s} className="space-y-1">
                              <label className="block text-[9px] text-zinc-600 mb-1 uppercase font-black tracking-widest pl-1">{s}</label>
                              <input type="text" value={config[s.toLowerCase()] || ''} onChange={e => set(s.toLowerCase(), e.target.value)} placeholder={`URL de ${s}`} className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-xl text-white text-[10px] focus:border-purple-500 outline-none transition-all" />
                           </div>
                         ))}
                      </div>
                   )}
                </div>
             )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BOOKING (Citas / Reservas)
      ══════════════════════════════════════════════ */}
      {mod.type === 'booking' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />

          {/* Toggle de Sincronización */}
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-3xl flex items-center justify-between gap-6 shadow-[0_0_50px_rgba(124,58,237,0.1)]">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📅</div>
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Sincronizar Teléfonos con Marca</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Los botones de reserva usarán el teléfono principal de tu Identidad de Marca.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-125 mr-2">
              <input type="checkbox" className="sr-only peer" checked={config.useGlobalBooking ?? true} onChange={e => set('useGlobalBooking', e.target.checked)} />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full border border-zinc-700"></div>
            </label>
          </div>

          <div className="p-8 bg-zinc-950/40 border border-zinc-800 rounded-3xl space-y-8 relative overflow-hidden">
             <div className="text-center space-y-3 border-b border-zinc-800/50 pb-8">
                <div className="text-4xl mx-auto mb-2 opacity-80">📱</div>
                <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Canales de Reserva</h4>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Configura cómo quieres que tus clientes te contacten.</p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* WhatsApp */}
                <div className={`p-8 border rounded-[2.5rem] transition-all relative overflow-hidden group/wa ${config.showWhatsapp ? 'bg-green-600/5 border-green-500/20' : 'bg-zinc-900/20 border-zinc-800 opacity-40'}`}>
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl">🟢</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={config.showWhatsapp ?? true} onChange={e => set('showWhatsapp', e.target.checked)} />
                        <div className="w-9 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full border border-zinc-600"></div>
                      </label>
                   </div>
                   <h5 className="text-white font-black uppercase tracking-widest text-xs mb-1">WhatsApp Business</h5>
                   <p className="text-[9px] text-zinc-500 mb-6 uppercase font-bold">Reserva vía chat</p>
                   
                   {config.useGlobalBooking ? (
                     <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 font-mono text-xs animate-pulse">
                        {initialSettings?.contactPhones?.[0] || 'Sin teléfono global'}
                     </div>
                   ) : (
                     <input type="text" value={config.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} placeholder="+34 600..." className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-green-500 transition-all outline-none" />
                   )}
                </div>

                {/* Teléfono */}
                <div className={`p-8 border rounded-[2.5rem] transition-all relative overflow-hidden group/ph ${config.showPhone ? 'bg-purple-600/5 border-purple-500/20' : 'bg-zinc-900/20 border-zinc-800 opacity-40'}`}>
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl">📞</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={config.showPhone ?? true} onChange={e => set('showPhone', e.target.checked)} />
                        <div className="w-9 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full border border-zinc-600"></div>
                      </label>
                   </div>
                   <h5 className="text-white font-black uppercase tracking-widest text-xs mb-1">Llamada Directa</h5>
                   <p className="text-[9px] text-zinc-500 mb-6 uppercase font-bold">Cita telefónica</p>
                   
                   {config.useGlobalBooking ? (
                     <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 font-mono text-xs animate-pulse">
                        {initialSettings?.contactPhones?.[0] || 'Sin teléfono global'}
                     </div>
                   ) : (
                     <input type="text" value={config.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+34 91..." className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-purple-500 transition-all outline-none" />
                   )}
                </div>
             </div>

                <div className="pt-6 border-t border-zinc-800 space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest">🚀 Botón Personalizado (Reserva Externa)</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={config.showBookingBtn ?? false} onChange={e => set('showBookingBtn', e.target.checked)} />
                        <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                   </div>
                   <p className="text-xs text-zinc-500">Úsalo para enlazar a plataformas externas (Fresha, Calendly, Treatwell, etc.)</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" value={config.bookingBtnText || ''} onChange={e => set('bookingBtnText', e.target.value)} placeholder="Ej: Reservar en Fresha" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-bold text-sm" />
                      <input type="text" value={config.bookingBtnUrl || ''} onChange={e => set('bookingBtnUrl', e.target.value)} placeholder="https://plataforma.com/tu-negocio" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 text-xs" />
                   </div>
                </div>
             </div>
          </div>
      )}

      {/* ══════════════════════════════════════════════
          FOOTER (Pie de Página)
      ══════════════════════════════════════════════ */}
      {mod.type === 'footer' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📁 Información del Pie</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div>
                      <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Nombre Comercial</label>
                      <input type="text" value={config.businessName || ''} onChange={e => set('businessName', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black text-lg" />
                   </div>
                   <div>
                      <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Lema o Descripción Corta</label>
                      <textarea rows={3} value={config.tagline || ''} onChange={e => set('tagline', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs resize-none" />
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                      <div className="flex items-center justify-between mb-3 pr-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-black">📱 Enlaces Sociales</label>
                        <div className="p-2 bg-purple-500/5 border border-purple-500/10 rounded-lg flex items-center gap-2">
                           <span className="text-[8px] text-purple-400 font-black uppercase">¿Sincronizar?</span>
                           <label className="relative inline-flex items-center cursor-pointer scale-75">
                              <input type="checkbox" className="sr-only peer" checked={config.useGlobalSocials ?? true} onChange={e => set('useGlobalSocials', e.target.checked)} />
                              <div className="w-8 h-4 bg-zinc-800 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                           </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {['Instagram','Facebook','TikTok','Twitter','WhatsApp'].map(s => (
                           <div key={s}>
                              <input type="text" value={config.socials?.[s.toLowerCase()] || ''} 
                                onChange={e => set('socials', { ...(config.socials || {}), [s.toLowerCase()]: e.target.value })} 
                                placeholder={s} 
                                disabled={config.useGlobalSocials ?? true}
                                className={`w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-white text-[10px] transition-opacity ${(config.useGlobalSocials ?? true) ? 'opacity-30' : ''}`} />
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="pt-4 border-t border-zinc-800">
                      <div className="flex items-center justify-between mb-3 pr-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-black">Copyright de Autor</label>
                         <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" className="sr-only peer" checked={config.showCopyright ?? true} onChange={e => set('showCopyright', e.target.checked)} />
                           <div className="w-9 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                         </label>
                      </div>
                      <div className="flex gap-2 items-center">
                         <input type="text" 
                           value={config.useGlobalBrand ? `© ${new Date().getFullYear()} ${initialSettings?.businessName || 'Mi Negocio'}` : (config.copyrightText || '')} 
                           onChange={e => set('copyrightText', e.target.value)} 
                           placeholder="© 2026 Mi Negocio. Todos los derechos reservados." 
                           disabled={config.useGlobalBrand ?? true}
                           className={`flex-1 px-3 py-2 bg-black border border-zinc-800 rounded-lg text-zinc-500 text-[10px] transition-opacity ${(config.useGlobalBrand ?? true) ? 'opacity-50' : ''}`} />
                         <button onClick={() => set('useGlobalBrand', !config.useGlobalBrand)} className={`px-3 py-2 rounded-lg text-[8px] font-black uppercase text-white transition-all ${config.useGlobalBrand ? 'bg-purple-600 shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-zinc-800 border border-zinc-700'}`}>
                            {config.useGlobalBrand ? '🔗 Marca' : 'Manual'}
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🎨 Colores del Footer</h4>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Fondo</label>
                   <input type="color" value={config.bgColor || '#09090b'} onChange={e => set('bgColor', e.target.value)} className="w-full h-10 rounded-xl cursor-pointer bg-black border border-zinc-800" />
                </div>
                <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Texto</label>
                   <input type="color" value={config.textColor || '#ffffff'} onChange={e => set('textColor', e.target.value)} className="w-full h-10 rounded-xl cursor-pointer bg-black border border-zinc-800" />
                </div>
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SCHEDULE (Horarios)
      ══════════════════════════════════════════════ */}
      {mod.type === 'schedule' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📅 Título de la Sección</h4>
            <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Ej: Nuestros Horarios" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
          </div>
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">⏰ Días y Horas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(config.days || []).map((day: any, idx: number) => (
                <div key={idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black text-xs uppercase tracking-widest">{day.day}</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!day.closed} onChange={e => handleArrayChange('days', idx, 'closed', !e.target.checked)} className="w-4 h-4 rounded accent-purple-500" />
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">Abierto</span>
                    </label>
                  </div>
                  {!day.closed && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {(day.intervals || []).map((interval: any, subIdx: number) => (
                          <div key={subIdx} className="flex gap-2 items-center group/int">
                            <input type="text" value={interval.open} onChange={e => handleDayIntervalChange(idx, subIdx, 'open', e.target.value)} placeholder="09:00" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-white text-center text-xs" />
                            <span className="text-zinc-600">—</span>
                            <input type="text" value={interval.close} onChange={e => handleDayIntervalChange(idx, subIdx, 'close', e.target.value)} placeholder="14:00" className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-white text-center text-xs" />
                            <button onClick={() => removeDayInterval(idx, subIdx)} className="text-zinc-700 hover:text-red-500 opacity-0 group-hover/int:opacity-100 transition-opacity px-1">✕</button>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => addDayInterval(idx)} className="w-full py-2 border border-dashed border-zinc-800 rounded-xl text-[9px] text-zinc-600 font-black uppercase hover:border-zinc-700 hover:text-zinc-400 transition-all">+ Añadir Turno</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          FAQ (Preguntas Frecuentes)
      ══════════════════════════════════════════════ */}
      {mod.type === 'faq' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Encabezado</h4>
             <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Ej: Preguntas Frecuentes" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">❓ Lista de Preguntas</h4>
                <button onClick={() => addArrayItem('faqs', { question: 'Nueva Pregunta', answer: 'Escribe aquí la respuesta...' })} className="text-xs bg-zinc-800 px-4 py-2 rounded-xl text-white font-bold">+ Añadir FAQ</button>
             </div>
             <div className="space-y-4">
                {(config.faqs || []).map((faq: any, idx: number) => (
                  <div key={idx} className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl relative group">
                     <button onClick={() => removeArrayItem('faqs', idx)} className="absolute top-4 right-4 text-zinc-700 hover:text-red-500">✕</button>
                     <div className="space-y-4">
                        <input type="text" value={faq.question} onChange={e => handleArrayChange('faqs', idx, 'question', e.target.value)} placeholder="Pregunta" className="w-full bg-transparent text-white font-black text-lg focus:border-b border-purple-500 outline-none" />
                        <textarea value={faq.answer} onChange={e => handleArrayChange('faqs', idx, 'answer', e.target.value)} placeholder="Respuesta..." rows={3} className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-white/70 text-sm resize-none" />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          STEPS (Proceso / Pasos de compra)
      ══════════════════════════════════════════════ */}
      {mod.type === 'steps' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Títulos</h4>
             <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Ej: ¿Cómo trabajamos?" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
             <input type="text" value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} placeholder="Subtítulo opcional" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500" />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">👣 Pasos del Proceso</h4>
                <button onClick={() => addArrayItem('steps', { number: '01', title: 'Paso nuevo', description: 'Describe este paso...' })} className="text-xs bg-zinc-800 px-4 py-2 rounded-xl text-white font-bold">+ Añadir Paso</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(config.steps || []).map((step: any, idx: number) => (
                  <div key={idx} className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl relative group">
                     <button onClick={() => removeArrayItem('steps', idx)} className="absolute top-4 right-4 text-zinc-700 hover:text-red-500">✕</button>
                     <div className="flex gap-4">
                        <input type="text" value={step.number} onChange={e => handleArrayChange('steps', idx, 'number', e.target.value)} className="w-16 h-16 bg-black border border-zinc-800 rounded-2xl text-white font-black text-2xl text-center shrink-0" />
                        <div className="flex-1 space-y-3">
                           <input type="text" value={step.title} onChange={e => handleArrayChange('steps', idx, 'title', e.target.value)} placeholder="Título" className="w-full bg-transparent text-white font-black text-lg" />
                           <textarea value={step.description} onChange={e => handleArrayChange('steps', idx, 'description', e.target.value)} placeholder="Descripción..." rows={2} className="w-full bg-black/40 border border-zinc-800 rounded-xl px-3 py-2 text-white/50 text-xs resize-none" />
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          VIDEO (YouTube / Vimeo)
      ══════════════════════════════════════════════ */}
      {mod.type === 'video' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
             <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🎥 Configuración de Vídeo</h4>
             <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">Título del Vídeo</label>
                  <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black">URL de YouTube / Vimeo</label>
                  <input type="text" value={config.videoUrl || ''} onChange={e => set('videoUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 font-mono text-xs" />
                  <p className="text-[9px] text-zinc-600 mt-2 uppercase tracking-tight">El sistema convertirá automáticamente el enlace a modo 'Embed'.</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          IMAGE + TEXT (Secciones Mixtas)
      ══════════════════════════════════════════════ */}
      {mod.type === 'image_text' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Contenido Escrito</h4>
                <div className="space-y-4">
                   <input type="text" value={config.badge || ''} onChange={e => set('badge', e.target.value)} placeholder="Etiqueta (Badge)" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-purple-400 text-xs font-bold" />
                   <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Título de la Sección" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black text-2xl" />
                   <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Párrafos descriptivos</label>
                      {(config.paragraphs || []).map((p: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                           <textarea value={p} onChange={e => {
                             const newP = [...config.paragraphs]; newP[idx] = e.target.value; set('paragraphs', newP)
                           }} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white/70 text-sm resize-none" />
                           <button onClick={() => {
                             const newP = [...config.paragraphs]; newP.splice(idx, 1); set('paragraphs', newP)
                           }} className="text-red-500">✕</button>
                        </div>
                      ))}
                      <button onClick={() => set('paragraphs', [...(config.paragraphs || []), ''])} className="w-full py-2 border border-dashed border-zinc-800 rounded-xl text-[10px] text-zinc-600">+ Añadir Párrafo</button>
                   </div>
                </div>
             </div>
             <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
                <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🖼️ Imagen y Disposición</h4>
                <div className="space-y-4">
                   <select value={config.layout || 'image_left'} onChange={e => set('layout', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-bold text-sm">
                      <option value="image_left">Imagen a la Izquierda</option>
                      <option value="image_right">Imagen a la Derecha</option>
                   </select>
                   <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-black mb-1 block">URL de Imagen</label>
                      <input type="text" value={config.imageUrl || ''} onChange={e => set('imageUrl', e.target.value)} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-600 text-[10px]" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          NEWSLETTER (Suscripciones)
      ══════════════════════════════════════════════ */}
      {mod.type === 'newsletter' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-10 bg-zinc-950/40 border border-zinc-800 rounded-3xl space-y-6 text-center max-w-3xl mx-auto">
             <div className="text-5xl mb-4">📧</div>
             <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Título: Únete al Club" className="w-full bg-transparent text-white font-black text-3xl text-center outline-none" />
             <input type="text" value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} placeholder="Subtítulo corto explicativo" className="w-full bg-transparent text-zinc-500 text-center outline-none" />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <input type="text" value={config.placeholder || 'Tu email aquí...'} onChange={e => set('placeholder', e.target.value)} className="px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white text-sm" />
                <input type="text" value={config.btnText || 'Suscribirse'} onChange={e => set('btnText', e.target.value)} className="px-4 py-3 bg-purple-600 text-white font-bold rounded-xl" />
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          COUNTDOWN (Contadores Regresivos)
      ══════════════════════════════════════════════ */}
      {mod.type === 'countdown' && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-8 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6 max-w-2xl mx-auto">
             <h4 className="text-center font-bold text-white text-sm uppercase tracking-widest">⏱️ Configura la Cuenta Atrás</h4>
             <div className="space-y-4">
                <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} placeholder="Título del evento" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-black text-xl text-center" />
                <div>
                   <label className="block text-[10px] text-zinc-500 mb-1 uppercase font-black text-center">Fecha y Hora de Finalización</label>
                   <input type="datetime-local" value={config.endDate || ''} onChange={e => set('endDate', e.target.value)} className="w-full px-4 py-4 bg-black border border-zinc-800 rounded-2xl text-white font-mono text-center" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" value={config.btnText || ''} onChange={e => set('btnText', e.target.value)} placeholder="Texto del Botón" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs" />
                   <input type="text" value={config.btnUrl || ''} onChange={e => set('btnUrl', e.target.value)} placeholder="URL del Botón" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 text-[10px]" />
                </div>
             </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          DEFAULT / GENERIC CONFIG
      ══════════════════════════════════════════════ */}
      {!['navbar','hero','features','pricing','contact','booking','footer','announcement','gallery','team','stats', 'schedule', 'faq', 'steps', 'video', 'image_text', 'newsletter', 'countdown'].includes(mod.type) && (
        <div className="space-y-6">
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">⚙️</div>
            <h4 className="text-center text-white font-black text-xl uppercase tracking-widest mb-10">Módulo: {mod.type}</h4>
            <div className="p-4 bg-yellow-900/10 border border-yellow-700/30 rounded-xl text-yellow-500 text-xs text-center leading-relaxed italic">
              Este módulo se edita mediante JSON directo en la base de datos hasta que su interfaz maestra esté finalizada. <br /> Sin embargo, puedes cambiar el estilo visual arriba.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BOTÓN DE GUARDADO FLOTANTE (Premium UI)
      ══════════════════════════════════════════════ */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="pointer-events-auto bg-white text-black font-black px-12 py-5 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center gap-4 group border border-white/50"
        >
          {isPending ? (
            <><div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin" /> PROCESANDO...</>
          ) : (
            <><span className="text-xl group-hover:rotate-12 transition-transform">💎</span> GUARDAR CONFIGURACIÓN</>
          )}
        </button>
      </div>
    </div>
  )
}
