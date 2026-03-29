"use client"

import { useState, useTransition } from "react"
import { updateModuleConfig } from "../actions"
import { useRouter } from "next/navigation"

// ─── Sección reutilizable de Color + Decoración ───────────────────────────────
function StyleSection({ config, onChange }: { config: any; onChange: (key: string, val: any) => void }) {
  return (
    <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-6">
      <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🎨 Estilo Visual</h4>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Color de fondo</label>
        <div className="flex gap-3 items-center">
          <input type="color" value={config.color || '#18181b'} onChange={e => onChange('color', e.target.value)}
            className="w-14 h-14 p-1 rounded-xl cursor-pointer bg-zinc-950 border border-zinc-800 shrink-0 hover:scale-105 transition-transform" />
          <input type="text" value={config.color || '#18181b'} onChange={e => onChange('color', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white uppercase font-mono tracking-widest" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-400 mb-3">✨ Decoración de Fondo</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'none',  label: 'Ninguna',    desc: 'Liso y minimalista' },
            { value: 'waves', label: 'Olas',        desc: 'Transición fluida' },
            { value: 'blob',  label: 'Burbuja',     desc: 'Forma abstracta' },
            { value: 'grid',  label: 'Cuadrícula',  desc: 'Patrón tecnológico' },
          ].map(d => (
            <label key={d.value} className={`cursor-pointer p-3 border rounded-xl transition-all ${config.decoration === d.value || (!config.decoration && d.value === 'none') ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}>
              <input type="radio" value={d.value} checked={config.decoration === d.value || (!config.decoration && d.value === 'none')} onChange={() => onChange('decoration', d.value)} className="sr-only" />
              <span className="font-semibold text-white text-sm block">{d.label}</span>
              <span className="text-xs text-zinc-500">{d.desc}</span>
            </label>
          ))}
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
  return { handleArrayChange, addArrayItem, removeArrayItem }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function EditModuleClient({ mod }: { mod: any }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [config, setConfig] = useState<any>(mod.config || {})

  const { handleArrayChange, addArrayItem, removeArrayItem } = useArrayHelpers(config, setConfig)
  const set = (key: string, val: any) => setConfig((prev: any) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    startTransition(async () => {
      await updateModuleConfig(mod.id, config)
      router.refresh()
      alert("¡Cambios guardados! Refresca la web pública para verlos.")
    })
  }

  return (
    <div className="space-y-6">

      {/* ══════════════════════════════════════════════
          NAVBAR (Cabecera)
      ══════════════════════════════════════════════ */}
      {mod.type === 'navbar' && (
        <>
          {/* Marca */}
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🏷️ Marca / Logo</h4>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer gap-3">
                <input type="checkbox" className="sr-only peer" checked={config.showLogo ?? true} onChange={e => set('showLogo', e.target.checked)} />
                <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                <span className="text-sm text-zinc-300">Mostrar Nombre / Logo</span>
              </label>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Texto del logotipo</label>
              <input type="text" value={config.logoText || ''} onChange={e => set('logoText', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Tamaño del logo</label>
              <div className="flex gap-3">
                {['sm','md','lg'].map(s => (
                  <label key={s} className={`flex-1 text-center cursor-pointer py-2 border rounded-xl transition-all text-sm font-semibold ${config.logoSize === s ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                    <input type="radio" value={s} checked={config.logoSize === s} onChange={() => set('logoSize', s)} className="sr-only" />
                    {s === 'sm' ? 'Pequeño' : s === 'md' ? 'Mediano' : 'Grande'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Menú de navegación */}
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🔗 Menú de Navegación</h4>
              <button onClick={() => addArrayItem('links', { label: 'Página Nueva', url: '#', openNewTab: false })}
                className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-1.5 px-3 rounded-lg transition">
                + Añadir Enlace
              </button>
            </div>
            <div className="space-y-3">
              {(config.links || []).map((link: any, idx: number) => (
                <div key={link.id || idx} className="p-4 bg-zinc-900 border border-zinc-700/50 rounded-xl relative group">
                  <button onClick={() => removeArrayItem('links', idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">✕</button>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Texto visible</label>
                      <input type="text" value={link.label || ''} onChange={e => handleArrayChange('links', idx, 'label', e.target.value)} placeholder="Inicio" className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">URL del enlace</label>
                      <input type="text" value={link.url || ''} onChange={e => handleArrayChange('links', idx, 'url', e.target.value)} placeholder="#inicio o /pagina" className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={link.openNewTab ?? false} onChange={e => handleArrayChange('links', idx, 'openNewTab', e.target.checked)} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 accent-purple-500" />
                    <span className="text-xs text-zinc-400">Abrir en pestaña nueva</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Botón CTA */}
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🚀 Botón de Acción (CTA)</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.showCta ?? true} onChange={e => set('showCta', e.target.checked)} />
                <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            {(config.showCta ?? true) && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Texto del botón</label>
                    <input type="text" value={config.ctaText || ''} onChange={e => set('ctaText', e.target.value)} className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">URL destino</label>
                    <input type="text" value={config.ctaUrl || ''} onChange={e => set('ctaUrl', e.target.value)} className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Estilo del botón</label>
                  <div className="flex gap-3">
                    {[
                      { val: 'filled',   label: 'Sólido (Relleno)' },
                      { val: 'outlined', label: 'Contorno' },
                      { val: 'ghost',    label: 'Fantasma' },
                    ].map(s => (
                      <label key={s.val} className={`flex-1 text-center cursor-pointer py-2 border rounded-xl transition-all text-xs font-semibold ${config.ctaStyle === s.val ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                        <input type="radio" value={s.val} checked={config.ctaStyle === s.val} onChange={() => set('ctaStyle', s.val)} className="sr-only" />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Estilo visual de la barra */}
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">🎨 Apariencia de la Barra</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-2">Color de fondo</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={config.bgColor || '#000000'} onChange={e => set('bgColor', e.target.value)} className="w-11 h-11 p-1 rounded-lg cursor-pointer bg-zinc-950 border border-zinc-800 hover:scale-105 transition-transform" />
                  <input type="text" value={config.bgColor || '#000000'} onChange={e => set('bgColor', e.target.value)} className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-xs uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-2">Color del texto / enlaces</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={config.textColor || '#ffffff'} onChange={e => set('textColor', e.target.value)} className="w-11 h-11 p-1 rounded-lg cursor-pointer bg-zinc-950 border border-zinc-800 hover:scale-105 transition-transform" />
                  <input type="text" value={config.textColor || '#ffffff'} onChange={e => set('textColor', e.target.value)} className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-xs uppercase" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Transparencia / Fondo</label>
              <div className="flex gap-3">
                {[
                  { val: 'solid',       label: 'Sólido',      desc: 'Color puro' },
                  { val: 'blur',        label: 'Cristal',     desc: 'Blur + transparente' },
                  { val: 'transparent', label: 'Transparente', desc: 'Sin fondo visible' },
                ].map(o => (
                  <label key={o.val} className={`flex-1 cursor-pointer p-3 border rounded-xl transition-all ${config.bgOpacity === o.val ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}>
                    <input type="radio" value={o.val} checked={config.bgOpacity === o.val} onChange={() => set('bgOpacity', o.val)} className="sr-only" />
                    <span className="font-semibold text-white text-xs block">{o.label}</span>
                    <span className="text-[10px] text-zinc-500">{o.desc}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={config.showBorder ?? false} onChange={e => set('showBorder', e.target.checked)} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 accent-purple-500" />
                <span className="text-sm text-zinc-300">Mostrar borde inferior</span>
              </label>
            </div>
          </div>

          {/* Posición y Layout */}
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">⚙️ Comportamiento</h4>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Posición al hacer scroll</label>
              <div className="flex gap-3">
                {[
                  { val: 'sticky',   label: 'Pegado (Sticky)', desc: 'Sigue al usuario al bajar' },
                  { val: 'fixed',    label: 'Fijo (Fixed)',     desc: 'Siempre visible encima' },
                  { val: 'relative', label: 'Normal',          desc: 'Desaparece al bajar' },
                ].map(p => (
                  <label key={p.val} className={`flex-1 cursor-pointer p-3 border rounded-xl transition-all ${config.position === p.val ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}>
                    <input type="radio" value={p.val} checked={config.position === p.val} onChange={() => set('position', p.val)} className="sr-only" />
                    <span className="font-semibold text-white text-xs block">{p.label}</span>
                    <span className="text-[10px] text-zinc-500">{p.desc}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Distribución del menú</label>
              <div className="flex gap-3">
                {[
                  { val: 'standard', label: 'Estándar',   desc: 'Logo izq · Links centro · CTA der' },
                  { val: 'centered', label: 'Centrado',   desc: 'Todo centrado' },
                  { val: 'minimal',  label: 'Minimal',    desc: 'Solo logo + CTA' },
                ].map(l => (
                  <label key={l.val} className={`flex-1 cursor-pointer p-3 border rounded-xl transition-all ${config.layout === l.val ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}>
                    <input type="radio" value={l.val} checked={config.layout === l.val} onChange={() => set('layout', l.val)} className="sr-only" />
                    <span className="font-semibold text-white text-xs block">{l.label}</span>
                    <span className="text-[10px] text-zinc-500">{l.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════
          HERO (Portada)
      ══════════════════════════════════════════════ */}
      {mod.type === 'hero' && (
        <>
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📝 Contenido</h4>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Título principal</label>
              <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Subtítulo o descripción</label>
              <textarea rows={2} value={config.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white resize-none" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Texto del botón</label>
              <input type="text" value={config.buttonText || ''} onChange={e => set('buttonText', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════
          FEATURES (Servicios / Tarjetas)
      ══════════════════════════════════════════════ */}
      {mod.type === 'features' && (
        <>
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Título de la sección</label>
              <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-white text-sm">🃏 Tarjetas de Servicio</h4>
                <button onClick={() => addArrayItem('cards', { title: "Nueva Tarjeta", subtitle: "Algo breve", description: "Descripción..." })}
                  className="text-xs bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-1.5 px-3 rounded-lg transition">+ Tarjeta</button>
              </div>
              <div className="space-y-3">
                {(config.cards || []).map((card: any, idx: number) => (
                  <div key={card.id || idx} className="p-4 bg-zinc-900 border border-zinc-700/50 rounded-xl relative group">
                    <button onClick={() => removeArrayItem('cards', idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">✕</button>
                    <h5 className="text-[10px] text-zinc-500 mb-2 uppercase tracking-wider font-bold">Tarjeta #{idx + 1}</h5>
                    <div className="space-y-2">
                      <input type="text" value={card.title || ''} onChange={e => handleArrayChange('cards', idx, 'title', e.target.value)} placeholder="Título" className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />
                      <input type="text" value={card.subtitle || ''} onChange={e => handleArrayChange('cards', idx, 'subtitle', e.target.value)} placeholder="Subtítulo breve" className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm" />

                      {/* Párrafos dinámicos */}
                      <div className="pt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Párrafos</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newCards = [...(config.cards || [])]
                              const paragraphs = [...(newCards[idx].paragraphs || []), '']
                              newCards[idx] = { ...newCards[idx], paragraphs }
                              setConfig((prev: any) => ({ ...prev, cards: newCards }))
                            }}
                            className="text-[10px] bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-0.5 px-2 rounded transition"
                          >+ Párrafo</button>
                        </div>
                        {(card.paragraphs || []).map((para: string, pIdx: number) => (
                          <div key={pIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={para}
                              onChange={e => {
                                const newCards = [...(config.cards || [])]
                                const paragraphs = [...(newCards[idx].paragraphs || [])]
                                paragraphs[pIdx] = e.target.value
                                newCards[idx] = { ...newCards[idx], paragraphs }
                                setConfig((prev: any) => ({ ...prev, cards: newCards }))
                              }}
                              placeholder={`Párrafo ${pIdx + 1}...`}
                              className="flex-1 px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newCards = [...(config.cards || [])]
                                const paragraphs = [...(newCards[idx].paragraphs || [])]
                                paragraphs.splice(pIdx, 1)
                                newCards[idx] = { ...newCards[idx], paragraphs }
                                setConfig((prev: any) => ({ ...prev, cards: newCards }))
                              }}
                              className="p-2 text-zinc-600 hover:text-red-400 rounded-lg transition"
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      {mod.type === 'faq' && (
        <>
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-5">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Título de la sección</label>
              <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-white text-sm">❓ Preguntas</h4>
                <button onClick={() => addArrayItem('faqs', { question: "¿Nueva pregunta?", answer: "Respuesta aquí." })}
                  className="text-xs bg-green-700 hover:bg-green-600 text-white font-bold py-1.5 px-3 rounded-lg transition">+ Pregunta</button>
              </div>
              <div className="space-y-3">
                {(config.faqs || []).map((faq: any, idx: number) => (
                  <div key={faq.id || idx} className="p-4 bg-zinc-900 border border-zinc-700/50 rounded-xl relative group">
                    <button onClick={() => removeArrayItem('faqs', idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">✕</button>
                    <div className="space-y-2">
                      <input type="text" value={faq.question || ''} onChange={e => handleArrayChange('faqs', idx, 'question', e.target.value)} placeholder="¿Cuál es la pregunta?" className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm font-semibold" />
                      <textarea value={faq.answer || ''} onChange={e => handleArrayChange('faqs', idx, 'answer', e.target.value)} placeholder="Respuesta..." rows={2} className="w-full px-3 py-2 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm resize-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════ */}
      {mod.type === 'contact' && (
        <>
          <StyleSection config={config} onChange={set} />
          <div className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest">📬 Datos de Contacto</h4>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Título de la sección</label>
              <input type="text" value={config.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Correo electrónico</label>
              <input type="email" value={config.email || ''} onChange={e => set('email', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Teléfono</label>
              <input type="text" value={config.phone || ''} onChange={e => set('phone', e.target.value)} className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white" />
            </div>
          </div>
        </>
      )}

      {/* Guardar */}
      <div className="sticky bottom-0 pt-6 bg-zinc-900/95 backdrop-blur rounded-b-2xl pb-2">
        <button onClick={handleSave} disabled={isPending}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-purple-600/30 text-lg">
          {isPending ? '⏳ Guardando...' : '💾 Guardar y Publicar'}
        </button>
      </div>
    </div>
  )
}
