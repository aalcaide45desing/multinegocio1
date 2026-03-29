"use client"

import { useTransition, useState, useMemo } from "react"
import { toggleModuleStatus, createModule, deleteModule, swapModuleOrder } from "./actions"
import { useRouter } from "next/navigation"

type AppModule = {
  id: string; name: string; type: string
  config: any; isActive: boolean; order: number
}

// Catálogo completo de módulos con metadatos visuales
const MODULE_CATALOGUE = [
  { value: 'announcement',  label: '📢 Barra de Anuncio',       desc: 'Banner fijo de oferta o aviso urgente',       category: 'Estructura',  color: 'border-red-500 bg-red-500/10' },
  { value: 'navbar',        label: '🧭 Cabecera (Navbar)',       desc: 'Menú de navegación, logo, colores de marca',  category: 'Estructura',  color: 'border-zinc-400 bg-zinc-700/30' },
  { value: 'hero',          label: '🎯 Portada Principal (Hero)', desc: 'Título gigante, subtítulo y botones de acción', category: 'Contenido',   color: 'border-purple-500 bg-purple-500/10' },
  { value: 'cta_banner',    label: '⚡ Banner de Oferta (CTA)',  desc: 'Llamada a la acción destacada con botones',   category: 'Contenido',   color: 'border-pink-500 bg-pink-500/10' },
  { value: 'image_text',    label: '🖼️ Imagen + Texto',          desc: 'Bloque con imagen y párrafos al lado',        category: 'Contenido',   color: 'border-indigo-500 bg-indigo-500/10' },
  { value: 'text_columns',  label: '📄 Columnas de Texto',       desc: 'Bloque multi-columna de información',         category: 'Contenido',   color: 'border-sky-500 bg-sky-500/10' },
  { value: 'features',      label: '🛎️ Servicios / Tarjetas',    desc: 'Tarjetas con emoji, título y párrafos',       category: 'Servicios',   color: 'border-cyan-500 bg-cyan-500/10' },
  { value: 'pricing',       label: '💲 Lista de Precios',         desc: 'Tarifario por categorías',                    category: 'Servicios',   color: 'border-emerald-500 bg-emerald-500/10' },
  { value: 'schedule',      label: '🕐 Horario Semanal',          desc: 'Horario de apertura día a día',               category: 'Servicios',   color: 'border-teal-500 bg-teal-500/10' },
  { value: 'steps',         label: '🪜 Cómo funciona',            desc: 'Pasos numerados del flujo del servicio',     category: 'Servicios',   color: 'border-blue-500 bg-blue-500/10' },
  { value: 'booking',       label: '📅 Reserva / Cita',           desc: 'Teléfono, WhatsApp, enlace de reserva',      category: 'Servicios',   color: 'border-violet-500 bg-violet-500/10' },
  { value: 'stats',         label: '📊 Estadísticas / Números',   desc: 'Números impactantes que generan confianza',   category: 'Social',      color: 'border-purple-600 bg-purple-600/10' },
  { value: 'reviews',       label: '⭐ Reseñas / Testimonios',    desc: 'Opiniones de clientes con estrellas',         category: 'Social',      color: 'border-yellow-500 bg-yellow-500/10' },
  { value: 'team',          label: '👥 Equipo / Personal',         desc: 'Fichas del equipo con foto y bio',            category: 'Social',      color: 'border-orange-500 bg-orange-500/10' },
  { value: 'social_links',  label: '📱 Redes Sociales',           desc: 'Botones a Instagram, Facebook, TikTok...',    category: 'Social',      color: 'border-rose-500 bg-rose-500/10' },
  { value: 'gallery',       label: '🖼️ Galería de Fotos',         desc: 'Cuadrícula de imágenes del negocio',          category: 'Media',       color: 'border-fuchsia-500 bg-fuchsia-500/10' },
  { value: 'video',         label: '▶️ Video Embebido',            desc: 'YouTube o Vimeo integrado',                   category: 'Media',       color: 'border-red-500 bg-red-500/10' },
  { value: 'newsletter',    label: '📨 Suscripción / Newsletter',  desc: 'Campo de email para captar suscriptores',    category: 'Formularios', color: 'border-lime-500 bg-lime-500/10' },
  { value: 'countdown',     label: '⏳ Cuenta Atrás',             desc: 'Contador para eventos o aperturas',           category: 'Formularios', color: 'border-amber-500 bg-amber-500/10' },
  { value: 'contact',       label: '📬 Contacto',                 desc: 'Email, teléfono, mapa y redes sociales',      category: 'Contacto',    color: 'border-blue-400 bg-blue-400/10' },
  { value: 'faq',           label: '❓ Preguntas Frecuentes',      desc: 'Preguntas y respuestas estructuradas',        category: 'Contacto',    color: 'border-green-500 bg-green-500/10' },
  { value: 'footer',        label: '🏁 Pie de Página',             desc: 'Footer con redes, copyright y enlaces',      category: 'Estructura',  color: 'border-zinc-500 bg-zinc-700/30' },
]

const TYPE_VISUAL: Record<string, { label: string; gradient: string }> = {
  announcement: { label: 'Anuncio',       gradient: 'from-red-600 to-orange-600' },
  navbar:       { label: 'Cabecera',      gradient: 'from-zinc-600 to-zinc-800' },
  hero:         { label: 'Hero',          gradient: 'from-purple-600 to-pink-600' },
  cta_banner:   { label: 'Banner CTA',    gradient: 'from-pink-600 to-rose-600' },
  image_text:   { label: 'Imagen+Texto',  gradient: 'from-indigo-600 to-blue-700' },
  text_columns: { label: 'Columnas',      gradient: 'from-sky-600 to-blue-600' },
  features:     { label: 'Servicios',     gradient: 'from-cyan-600 to-blue-600' },
  pricing:      { label: 'Precios',       gradient: 'from-emerald-600 to-green-600' },
  schedule:     { label: 'Horario',       gradient: 'from-teal-600 to-cyan-600' },
  steps:        { label: 'Cómo funciona', gradient: 'from-blue-600 to-indigo-600' },
  booking:      { label: 'Reservas',      gradient: 'from-violet-600 to-purple-600' },
  stats:        { label: 'Estadísticas',  gradient: 'from-purple-700 to-fuchsia-700' },
  reviews:      { label: 'Reseñas',       gradient: 'from-yellow-500 to-orange-500' },
  team:         { label: 'Equipo',        gradient: 'from-orange-600 to-red-600' },
  social_links: { label: 'Redes SS.',     gradient: 'from-rose-600 to-pink-600' },
  gallery:      { label: 'Galería',       gradient: 'from-fuchsia-600 to-purple-600' },
  video:        { label: 'Video',         gradient: 'from-red-600 to-red-800' },
  newsletter:   { label: 'Newsletter',    gradient: 'from-lime-600 to-green-600' },
  countdown:    { label: 'Cuenta Atrás',  gradient: 'from-amber-500 to-orange-600' },
  contact:      { label: 'Contacto',      gradient: 'from-blue-500 to-cyan-600' },
  faq:          { label: 'FAQ',           gradient: 'from-green-600 to-emerald-600' },
  footer:       { label: 'Footer',        gradient: 'from-zinc-700 to-zinc-900' },
}

const CATEGORIES = ['Todos', 'Estructura', 'Contenido', 'Servicios', 'Social', 'Media', 'Formularios', 'Contacto']

export default function ModulesClient({ initialModules }: { initialModules: AppModule[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newModuleName, setNewModuleName] = useState("")
  const [newModuleType, setNewModuleType] = useState("hero")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const handleToggle = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleModuleStatus(id, currentStatus)
      router.refresh()
    })
  }

  const handleDelete = (id: string) => {
    if (!window.confirm("¿Eliminar este bloque de la web de forma permanente?")) return
    startTransition(async () => {
      await deleteModule(id)
      router.refresh()
    })
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    startTransition(async () => {
      await createModule(newModuleType, newModuleName, initialModules.length)
      setNewModuleName("")
      router.refresh()
    })
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const a = initialModules[index], b = initialModules[index - 1]
    startTransition(async () => { await swapModuleOrder(a.id, a.order, b.id, b.order); router.refresh() })
  }

  const handleMoveDown = (index: number) => {
    if (index === initialModules.length - 1) return
    const a = initialModules[index], b = initialModules[index + 1]
    startTransition(async () => { await swapModuleOrder(a.id, a.order, b.id, b.order); router.refresh() })
  }

  const filteredCatalogue = useMemo(() => {
    return MODULE_CATALOGUE.filter(m => {
      const matchSearch = (m.label + m.desc + m.category).toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'Todos' || m.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          Bloques Públicos
          <span className="text-sm text-zinc-500 font-normal">({initialModules.length})</span>
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva Sección
        </button>
      </div>

      {/* Lista de módulos */}
      {initialModules.length === 0 ? (
        <div className="p-16 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center text-center">
          <span className="text-5xl mb-4">🖥️</span>
          <h3 className="text-white font-medium text-lg">Tu web está en blanco</h3>
          <p className="text-zinc-400 mt-2 max-w-sm">Pulsa "Nueva Sección" para empezar a construir tu web.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {initialModules.map((mod, i) => {
            const visual = TYPE_VISUAL[mod.type] || { label: mod.type, gradient: 'from-zinc-600 to-zinc-800' }
            return (
              <div key={mod.id} className={`flex items-center gap-3 p-4 bg-zinc-900/80 backdrop-blur border border-zinc-800/60 rounded-2xl transition-all ${isPending ? 'opacity-60' : ''} ${!mod.isActive ? 'opacity-40 grayscale' : ''}`}>
                {/* Flechas */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button onClick={() => handleMoveUp(i)} disabled={i === 0 || isPending} className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition" title="Subir">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                  </button>
                  <span className={`text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br ${visual.gradient} text-white`}>{i + 1}</span>
                  <button onClick={() => handleMoveDown(i)} disabled={i === initialModules.length - 1 || isPending} className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition" title="Bajar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="text-white font-bold truncate">{mod.name}</h3>
                    <span className={`text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${visual.gradient} text-white shrink-0`}>{visual.label}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{mod.isActive ? '✅ Visible en la web pública' : '⛔ Oculto para visitantes'}</p>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer" title={mod.isActive ? 'Ocultar' : 'Publicar'}>
                    <input type="checkbox" className="sr-only peer" checked={mod.isActive} onChange={() => handleToggle(mod.id, mod.isActive)} disabled={isPending} />
                    <div className="w-10 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                  <button onClick={() => router.push(`/admin/modules/${mod.id}`)} className="p-2 bg-zinc-800 hover:bg-purple-600 rounded-lg text-zinc-300 hover:text-white transition" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(mod.id)} className="p-2 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-500 transition" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
              <h3 className="text-xl font-bold text-white">Añadir nueva sección</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre interno</label>
                <input
                  type="text" value={newModuleName} onChange={e => setNewModuleName(e.target.value)}
                  placeholder="Ej: Portada Verano 2025"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Selección de tipo */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-3">Tipo de Sección</label>

                {/* Buscador */}
                <div className="relative mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                  <input
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar módulo... (ej: galería, precios, horario)"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Filtro por categoría */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {CATEGORIES.map(cat => (
                    <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition ${activeCategory === cat ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid de tipos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                  {filteredCatalogue.length === 0 && (
                    <p className="col-span-2 text-center text-zinc-500 py-8">No se encontraron módulos para "{search}"</p>
                  )}
                  {filteredCatalogue.map(type => (
                    <label key={type.value} className={`block cursor-pointer p-3 border rounded-xl transition-all ${newModuleType === type.value ? type.color + ' ring-1 ring-inset ring-white/20' : 'border-zinc-800 hover:border-zinc-600'}`}>
                      <input type="radio" value={type.value} checked={newModuleType === type.value} onChange={() => setNewModuleType(type.value)} className="sr-only" />
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-white text-sm leading-tight">{type.label}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{type.desc}</p>
                    </label>
                  ))}
                </div>
                {filteredCatalogue.length > 0 && (
                  <p className="text-xs text-zinc-600 mt-2">{filteredCatalogue.length} tipo{filteredCatalogue.length !== 1 ? 's' : ''} disponible{filteredCatalogue.length !== 1 ? 's' : ''}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-white bg-zinc-800 hover:bg-zinc-700 transition">Cancelar</button>
                <button type="submit" disabled={isPending || !newModuleName.trim()} className="px-6 py-2.5 rounded-xl font-bold bg-white text-zinc-950 hover:bg-zinc-100 transition disabled:opacity-40">
                  ✅ Añadir Sección
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
