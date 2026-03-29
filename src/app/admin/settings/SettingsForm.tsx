"use client"

import { useState, useTransition } from "react"
import { updateSettings } from "./actions"

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [isPending, startTransition] = useTransition()
  const [settings, setSettings] = useState(initialSettings)

  const handleSave = () => {
    startTransition(async () => {
      await updateSettings(settings)
      alert("¡Identidad de Marca actualizada! 🎉 Los cambios se reflejarán en toda la web.")
    })
  }

  const onChange = (key: string, val: any) => setSettings((prev: any) => ({ ...prev, [key]: val }))

  // Helpers para múltiples teléfonos
  const handlePhoneChange = (idx: number, val: string) => {
    const phones = [...(settings.contactPhones || [])]
    phones[idx] = val
    onChange("contactPhones", phones)
  }
  const addPhone = () => onChange("contactPhones", [...(settings.contactPhones || []), ""])
  const removePhone = (idx: number) => {
    const phones = [...(settings.contactPhones || [])]
    phones.splice(idx, 1)
    onChange("contactPhones", phones)
  }

  return (
    <div className="space-y-8 pb-48 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
      
      {/* ─── SEO & Navegador ────────────────────────────────────────────────── */}
      <section className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
           <span className="text-8xl">🔍</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-xl shadow-lg border border-purple-500/30">🎯</div>
           <h3 className="text-xl font-black text-white uppercase tracking-widest leading-none">SEO & Presencia Digital</h3>
        </div>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] max-w-lg">Configura cómo aparece tu negocio en Google y en las pestañas de navegación.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
           <div className="space-y-2">
              <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Título del Sitio (Browser Title)</label>
              <input type="text" value={settings.siteTitle || ""} onChange={e => onChange("siteTitle", e.target.value)}
                className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white font-black text-lg focus:border-purple-500 transition-all outline-none" placeholder="Ej: Peluquería Bella | Estilo & Belleza" />
           </div>
           <div className="space-y-2">
              <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Nombre Comercial</label>
              <input type="text" value={settings.businessName || ""} onChange={e => onChange("businessName", e.target.value)}
                className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white font-black text-lg focus:border-purple-500 transition-all outline-none" placeholder="Mi Empresa S.L." />
           </div>
        </div>

        <div className="space-y-2">
           <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Descripción para Buscadores (SEO Meta Description)</label>
           <textarea rows={4} value={settings.siteDescription || ""} onChange={e => onChange("siteDescription", e.target.value)}
             className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white/70 text-sm leading-relaxed resize-none focus:border-purple-500 transition-all outline-none" placeholder="Describe brevemente qué hace tu negocio para mejorar el posicionamiento en Google..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">URL Favicon (Icono Pestaña)</label>
              <div className="flex gap-4 items-center">
                 <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-4xl overflow-hidden shrink-0">
                    {settings.faviconUrl ? <img src={settings.faviconUrl} alt="Favicon" className="w-full h-full object-contain" /> : "🌐"}
                 </div>
                 <input type="text" value={settings.faviconUrl || ""} onChange={e => onChange("faviconUrl", e.target.value)}
                   className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-zinc-500 text-[10px] font-mono" placeholder="https://..." />
              </div>
           </div>
           <div className="space-y-2">
              <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">URL Logo Global</label>
              <div className="flex gap-4 items-center">
                 <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-2xl overflow-hidden shrink-0 font-black italic">
                    {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain" /> : "LOGO"}
                 </div>
                 <input type="text" value={settings.logoUrl || ""} onChange={e => onChange("logoUrl", e.target.value)}
                   className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-zinc-500 text-[10px] font-mono" placeholder="https://..." />
              </div>
           </div>
        </div>
      </section>

      {/* ─── Colores Maestros ───────────────────────────────────────────────── */}
      <section className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl space-y-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
           <span className="text-8xl">🎨</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-xl shadow-lg border border-cyan-500/30">🌈</div>
           <h3 className="text-xl font-black text-white uppercase tracking-widest leading-none">Paleta de Colores Corporativa</h3>
        </div>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] max-w-lg">Estos colores se aplicarán automáticamente a todos los módulos si activas el branding global.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
           {[
             { k: "primaryColor",    l: "Primario",   d: "Acentos y Botones" },
             { k: "secondaryColor",  l: "Secundario", d: "Elementos Suaves" },
             { k: "backgroundColor", l: "Fondo Base", d: "Atmósfera del Sitio" }
           ].map(item => (
             <div key={item.k} className="p-4 bg-black/40 border border-zinc-800 rounded-2xl space-y-3">
                <label className="block text-[10px] text-zinc-400 font-black uppercase text-center">{item.l}</label>
                <div className="flex flex-col gap-3">
                   <input type="color" value={settings[item.k] || "#000"} onChange={e => onChange(item.k, e.target.value)}
                     className="w-full h-12 rounded-xl cursor-pointer bg-zinc-950 border border-zinc-800 p-1" />
                   <input type="text" value={settings[item.k] || "#000"} onChange={e => onChange(item.k, e.target.value)}
                     className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[10px] font-mono text-center uppercase" />
                </div>
                <p className="text-[9px] text-zinc-600 text-center font-bold uppercase">{item.d}</p>
             </div>
           ))}
        </div>
      </section>

      {/* ─── Contacto y Ubicación Global ────────────────────────────────────── */}
      <section className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl space-y-10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
           <span className="text-8xl">📍</span>
        </div>
        
        {/* Parte 1: Contacto Dinámico */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-xl shadow-lg border border-emerald-500/30">☎️</div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest leading-none">Canales de Contacto</h3>
          </div>
          
          <div className="space-y-8">
            {/* Email Principal en su propia fila balanceada */}
            <div className="max-w-md space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase font-black pl-2 tracking-widest">Email Corporativo Principal</label>
              <input type="email" value={settings.contactEmail || ""} onChange={e => onChange("contactEmail", e.target.value)}
                className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white text-sm focus:border-emerald-500 outline-none transition-all" placeholder="hola@empresa.com" />
            </div>

            {/* Cuadrícula Dinámica de Teléfonos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pl-2">
                <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Números de Teléfono y Atención</label>
                <button 
                  onClick={addPhone} 
                  className="group flex items-center gap-2 text-[10px] bg-emerald-500 text-black px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all font-black uppercase shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                >
                  <span className="text-sm">+</span> Añadir Teléfono
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(settings.contactPhones || []).map((phone: string, idx: number) => (
                  <div key={idx} className="relative group/phone animate-in zoom-in-95 duration-200">
                    <div className="absolute -top-2.5 -left-2 w-5 h-5 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-[9px] font-black text-zinc-500 group-hover/phone:text-emerald-500 transition-colors z-10">
                      {idx + 1}
                    </div>
                    <div className="flex bg-black/40 border border-zinc-800 rounded-2xl group-hover/phone:border-zinc-700 transition-all overflow-hidden shadow-xl">
                      <input 
                        type="text" 
                        value={phone} 
                        onChange={e => handlePhoneChange(idx, e.target.value)}
                        className="w-full px-5 py-4 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-700" 
                        placeholder="Ej: +34 600..." 
                      />
                      <button 
                        onClick={() => removePhone(idx)} 
                        className="px-4 bg-zinc-900/50 hover:bg-red-500/10 text-zinc-600 hover:text-red-500 transition-all border-l border-zinc-800/50"
                        title="Eliminar teléfono"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                
                {(settings.contactPhones || []).length === 0 && (
                  <button 
                    onClick={addPhone}
                    className="col-span-full py-8 border-2 border-dashed border-zinc-800 rounded-[2rem] text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">📱</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">No hay teléfonos registrados. Pulsa para añadir el primero.</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Separador Elegante */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-800/60"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-900 px-4 text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">Localización Física</span>
          </div>
        </div>

        {/* Parte 2: Ubicación Detallada */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Dirección (Calle y Número)</label>
               <input type="text" value={settings.address || ""} onChange={e => onChange("address", e.target.value)}
                 className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white text-sm focus:border-orange-500 transition-all outline-none" placeholder="Av. Principal 123..." />
            </div>
            <div className="space-y-2">
               <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Ciudad</label>
               <input type="text" value={settings.city || ""} onChange={e => onChange("city", e.target.value)}
                 className="w-full px-5 py-4 bg-black/60 border border-zinc-800 rounded-2xl text-white text-sm focus:border-orange-500 transition-all outline-none" placeholder="Madrid" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-black pl-2">Provincia</label>
                <input type="text" value={settings.province || ""} onChange={e => onChange("province", e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-white text-sm focus:border-orange-500 outline-none transition-all" placeholder="Barcelona" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-black pl-2">País</label>
                <input type="text" value={settings.country || ""} onChange={e => onChange("country", e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-white text-sm focus:border-orange-500 outline-none transition-all" placeholder="España" />
             </div>
          </div>

          <div className="space-y-2">
             <label className="block text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">URL Google Maps</label>
             <input type="text" value={settings.locationMapUrl || ""} onChange={e => onChange("locationMapUrl", e.target.value)}
               className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-zinc-400 text-[10px] font-mono focus:border-orange-500 outline-none transition-all" placeholder="https://..." />
          </div>
        </div>
      </section>

      {/* ─── Botón Flotante ─── */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-white text-black font-black px-16 py-6 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center gap-4 border border-white/50"
        >
          {isPending ? "GUARDANDO..." : "💎 GUARDAR IDENTIDAD"}
        </button>
      </div>

    </div>
  )
}
