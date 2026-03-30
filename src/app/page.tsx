import Image from "next/image"
import { db } from "@/lib/db"

// ─── SVG Decorativo ──────────────────────────────────────────────────────────
function Deco({ type }: { type?: string }) {
  if (type === 'waves') return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
      <svg className="block w-full h-[80px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C73.47,43.43,153.27,76.54,233.7,91.14Z" fill="rgba(255,255,255,0.05)" />
      </svg>
    </div>
  )
  if (type === 'blob') return (
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-10">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -right-20 w-[400px] h-[400px] fill-white">
        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.1,-46C90.4,-32.9,96.1,-16.4,94.9,-0.7C93.7,15,85.6,29.9,76.5,43.2C67.4,56.5,57.3,68.2,44.4,75.3C31.5,82.4,15.7,84.9,0.8,83.5C-14.1,82.1,-28.3,76.8,-41.8,69.5C-55.3,62.2,-68.2,52.9,-77.8,40.6C-87.4,28.3,-93.7,14.1,-95.1,-0.8C-96.5,-15.7,-93,-31.4,-84,-44.6C-75,-57.8,-60.5,-68.5,-45.5,-75.2C-30.5,-81.9,-15.2,-84.6,-0.1,-84.4C15,-84.2,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </div>
  )
  if (type === 'grid') return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
  )
  return null
}

function Stars({ n }: { n: number }) {
  return <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < n ? 'text-yellow-400' : 'text-zinc-700'}>★</span>)}</span>
}

// ─── Botones genéricos ───────────────────────────────────────────────────────
function Buttons({ buttons, config, size = 'lg' }: { buttons?: any[]; config: any; size?: 'sm' | 'lg' }) {
  if (!buttons?.length) return null
  const base = size === 'lg' ? 'px-8 py-4 text-sm sm:text-base font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl' : 'px-5 py-2.5 text-xs font-bold rounded-full transition-all hover:opacity-80'
  
  const primaryBg = config._global ? 'var(--brand-primary)' : (config.brandColor || '#ffffff')
  const primaryText = config._global ? 'var(--brand-bg)' : '#000000'

  return (
    <div className="flex flex-wrap gap-4">
      {buttons.map((btn: any) => {
        const s = btn.style
        if (s === 'outline' || s === 'outlined') {
          return <a key={btn.id} href={btn.url || '#'} className={`${base} border-2 border-white/40 text-white hover:bg-white/10 hover:border-white shadow-xl`}>{btn.text}</a>
        }
        if (s === 'ghost') {
          return <a key={btn.id} href={btn.url || '#'} className={`${base} text-white/70 hover:text-white hover:bg-white/5`}>{btn.text}</a>
        }
        return <a key={btn.id} href={btn.url || '#'} className={base} style={{ backgroundColor: primaryBg, color: primaryText }}>{btn.text}</a>
      })}
    </div>
  )
}

// ─── Mapeos de Tamaño ───────────────────────────────────────────────────────
const PADDING_Y: Record<string, string> = {
  none: 'py-0',
  xs: 'py-8 sm:py-12',
  sm: 'py-12 sm:py-20',
  md: 'py-20 sm:py-32',
  lg: 'py-32 sm:py-48',
  xl: 'py-48 sm:py-64'
}

// Si el usuario puso px manual, devuelve cadena vacía (se aplica inline en el wrapper)
function getPy(config: any, fallback: string = 'md'): string {
  if (config.paddingYPx != null && config.paddingYPx >= 0) return 'py-0'
  return PADDING_Y[config.paddingY] || PADDING_Y[fallback]
}

const MAX_WIDTH: Record<string, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-6xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-none px-4 sm:px-12'
}

// ─── Mapeos de Tipografía ────────────────────────────────────────────────────
const TITLE_SIZE: Record<string, string> = {
  xs: 'text-xl sm:text-2xl',
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
  xl: 'text-5xl sm:text-6xl',
  '2xl': 'text-5xl sm:text-7xl',
}

const SUBTITLE_SIZE: Record<string, string> = {
  xs: 'text-xs sm:text-sm',
  sm: 'text-sm sm:text-base',
  md: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl',
  xl: 'text-xl sm:text-2xl',
}

const BODY_SIZE: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg',
  xl: 'text-lg sm:text-xl',
}

const FONT_WEIGHT: Record<string, string> = {
  light: 'font-light',
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

function ts(config: any) {
  return {
    title: TITLE_SIZE[config.titleSize] || TITLE_SIZE.lg,
    subtitle: SUBTITLE_SIZE[config.subtitleSize] || SUBTITLE_SIZE.md,
    body: BODY_SIZE[config.bodySize] || BODY_SIZE.md,
    weight: FONT_WEIGHT[config.titleWeight] || FONT_WEIGHT.black,
    style: config.titleStyle === 'italic' ? 'italic' : '',
    // Estos se aplican por inline style en el wrapper
    fontFamily: config.fontFamily || '',
    heightPx: config.minHeightPx || 0,
    mb: config.marginBottomPx ? `${config.marginBottomPx}px` : '',
  }
}

// ════════════════════════════════════════════════════════
// ANNOUNCEMENT BAR
// ════════════════════════════════════════════════════════
function AnnouncementModule({ config }: { config: any }) {
  return (
    <div className="w-full py-2.5 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-3 flex-wrap relative z-[100] shadow-2xl" style={{ backgroundColor: config.bgColor || '#7c3aed', color: config.textColor || '#fff' }}>
      <span className="tracking-tight">{config.text}</span>
      {config.link && config.linkText && <a href={config.link} className="underline hover:no-underline opacity-90 hover:opacity-100 transition-opacity uppercase text-[10px] sm:text-xs">{config.linkText} →</a>}
    </div>
  )
}

// ════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════
function NavbarModule({ config }: { config: any }) {
  const logoSize = config.logoSize === 'sm' ? 'text-lg' : config.logoSize === 'lg' ? 'text-4xl' : 'text-2xl'
  const pos = config.position === 'fixed' ? 'fixed' : config.position === 'relative' ? 'relative' : 'sticky'
  const bgValue = config.bgOpacity === 'transparent' ? 'transparent' : config.bgOpacity === 'blur' ? `${config.bgColor || '#000'}cc` : (config.bgColor || '#000')
  const btns: any[] = config.buttons || (config.showCta ? [{ id: '0', text: config.ctaText || 'Contactar', url: config.ctaUrl || '#', style: config.ctaStyle || 'filled' }] : [])

  const primaryBg = config.brand?.applyGlobal ? 'var(--brand-primary)' : (config.textColor || '#fff')
  const primaryText = config.brand?.applyGlobal ? 'var(--brand-bg)' : (config.bgColor || '#000')

  return (
    <header className={`${pos} top-0 left-0 right-0 z-50 ${config.bgOpacity === 'blur' ? 'backdrop-blur-xl' : ''} ${config.showBorder ? 'border-b border-white/10' : ''}`} style={{ backgroundColor: bgValue }}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 ${config.layout === 'centered' ? 'flex flex-col items-center gap-4' : 'flex items-center justify-between gap-8'}`}>
        {(config.showLogo ?? true) && (
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <span className={`font-black tracking-tighter ${logoSize} transition-transform group-hover:scale-105`} style={{ color: config.textColor || '#fff' }}>{config.logoText || 'Mi Empresa'}</span>
          </a>
        )}
        <div className="flex items-center gap-3">
          {btns.map((btn: any) => {
            const isFilled = btn.style !== 'outline' && btn.style !== 'outlined' && btn.style !== 'ghost'
            return (
              <a key={btn.id} href={btn.url || '#'} 
                className={`hidden sm:inline-block text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl`}
                style={isFilled ? { backgroundColor: primaryBg, color: primaryText } : { border: `2px solid ${config.textColor || '#fff'}`, color: config.textColor || '#fff' }}>
                {btn.text}
              </a>
            )
          })}
          <button className="md:hidden p-2" style={{ color: config.textColor || '#fff' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>
  )
}

// ════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════
function HeroModule({ config }: { config: any }) {
  const align = config.textAlign === 'left' ? 'text-left items-start' : config.textAlign === 'right' ? 'text-right items-end' : 'text-center items-center'
  const py = getPy(config, 'xl')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const t = ts({ ...config, titleSize: config.titleSize || 'xl', subtitleSize: config.subtitleSize || 'lg' })
  return (
    <section className={`relative overflow-hidden ${py} px-4 flex items-center h-full`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto flex flex-col ${align} gap-8 w-full`}>
        {config.preTitleBadge && <span className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.3em]">{config.preTitleBadge}</span>}
        <h1 className={`${t.title} ${t.weight} ${t.style} text-white tracking-tighter leading-[0.9] max-w-4xl drop-shadow-2xl`}>{config.title || 'Bienvenidos'}</h1>
        <p className={`${t.subtitle} text-white/70 max-w-2xl font-medium leading-relaxed`}>{config.subtitle}</p>
        <Buttons buttons={config.buttons} config={config} />
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// SCHEDULE (Horarios)
// ════════════════════════════════════════════════════════
function ScheduleModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const accent = 'var(--brand-primary, #a855f7)'
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto`}>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-6 tracking-tighter`}>{config.title || 'Horarios'}</h2>
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase text-purple-400 tracking-[0.2em] mb-8">Horario Comercial</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(config.days || []).map((d: any, i: number) => (
            <div key={i} className={`p-6 rounded-[2rem] border ${d.closed ? 'border-zinc-800/50 bg-zinc-900/20 opacity-50' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:scale-105'} transition-all`}>
              <p className="font-black text-white uppercase text-xs tracking-widest mb-4">{d.day}</p>
              {d.closed ? (
                <span className="text-zinc-600 font-black text-sm uppercase">Cerrado</span>
              ) : (
                <div className="space-y-1">
                   {/* Detección de intervalos múltiples o fallback al formato simple */}
                   {(d.intervals && d.intervals.length > 0) ? (
                     d.intervals.map((interval: any, idx: number) => (
                        <p key={idx} className="text-white font-black text-xl tracking-tight">
                           {interval.open} <span className="text-zinc-600 mx-1">—</span> {interval.close}
                        </p>
                     ))
                   ) : (
                     <p className="text-white font-black text-xl tracking-tight">
                        {d.open} <span className="text-zinc-600 mx-1">—</span> {d.close}
                     </p>
                   )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// STATS (Métricas)
// ════════════════════════════════════════════════════════
function StatsModule({ config }: { config: any }) {
  const py = getPy(config, 'sm')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <Deco type={config.decoration} />
       <div className={`${mw} mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center`}>
          {(config.stats || []).map((s: any, i: number) => (
             <div key={i} className="group">
                <p className={`${ts({ ...config, titleSize: config.titleSize || 'lg' }).title} font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform`}>{s.number}</p>
                 <p className={`${ts(config).body} font-black uppercase tracking-[0.3em] text-zinc-500 leading-tight`}>{s.label}</p>
             </div>
          ))}
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════
function FaqModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.sm
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <Deco type={config.decoration} />
       <div className={`${mw} mx-auto relative z-10`}>
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 text-center tracking-tighter`}>{config.title || 'FAQ'}</h2>
          <div className="space-y-4">
             {(config.faqs || []).map((faq: any, i: number) => (
               <details key={i} className="group bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                  <summary className="flex items-center justify-between p-8 sm:p-10 cursor-pointer list-none">
                     <h3 className="text-lg sm:text-xl font-black text-white pr-8">{faq.question}</h3>
                     <span className="text-3xl text-zinc-700 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-10 pb-10">
                     <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                  </div>
               </details>
             ))}
          </div>
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// STEPS (Pasos)
// ════════════════════════════════════════════════════════
function StepsModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10`}>
          <div className="mb-20">
             <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-4 tracking-tighter`}>{config.title || 'Proceso'}</h2>
              {config.subtitle && <p className={`text-zinc-500 ${ts(config).subtitle} font-medium uppercase tracking-widest`}>{config.subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
             {(config.steps || []).map((s: any, i: number) => (
               <div key={i} className="relative group">
                  <span className="text-7xl sm:text-9xl font-black text-white/5 absolute -top-12 -left-6 group-hover:text-purple-500/10 transition-colors">{s.number}</span>
                  <div className="relative pt-8">
                     <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-none uppercase">{s.title}</h3>
                     <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">{s.description}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// VIDEO
// ════════════════════════════════════════════════════════
function VideoModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10`}>
          <div className="text-center mb-12">
             <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white tracking-tighter`}>{config.title || 'Vídeo'}</h2>
              {config.subtitle && <p className={`text-zinc-500 ${ts(config).subtitle} mt-4 uppercase tracking-widest`}>{config.subtitle}</p>}
          </div>
          <div className="aspect-video w-full rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative">
             <iframe src={config.videoUrl?.replace('watch?v=', 'embed/')} title="Video" className="absolute inset-0 w-full h-full" allowFullScreen />
          </div>
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// IMAGE + TEXT
// ════════════════════════════════════════════════════════
function ImageTextModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const rev = config.layout === 'image_right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10 flex flex-col ${rev} gap-12 lg:gap-24 items-center`}>
          <div className="flex-1 w-full">
             <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl group">
                {config.imageUrl ? <Image src={config.imageUrl} alt={config.imageAlt || 'Image'} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full bg-zinc-800" />}
             </div>
          </div>
          <div className="flex-1 space-y-8">
             {config.badge && <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-400 font-bold text-[10px] uppercase tracking-widest">{config.badge}</span>}
             <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white leading-[0.9] tracking-tighter uppercase`}>{config.title}</h2>
             <div className="space-y-4">
               {(config.paragraphs || []).map((p: string, i: number) => (
                 <p key={i} className="text-zinc-500 text-lg sm:text-xl leading-relaxed font-medium">{p}</p>
               ))}
             </div>
             <Buttons buttons={config.buttons} config={config} />
          </div>
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// NEWSLETTER
// ════════════════════════════════════════════════════════
function NewsletterModule({ config }: { config: any }) {
  const py = getPy(config, 'lg')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.sm
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <Deco type={config.decoration} />
       <div className={`relative z-10 ${mw} mx-auto text-center`}>
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-6 tracking-tighter leading-none`}>{config.title || 'Newsletter'}</h2>
           <p className={`text-zinc-500 ${ts(config).subtitle} font-medium mb-12`}>{config.subtitle || 'Suscríbete para novedades.'}</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
             <input type="email" placeholder={config.placeholder || 'Email...'} className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:border-purple-500 outline-none transition-all shadow-inner" />
             <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-xl">{config.btnText || 'Suscribirme'}</button>
          </form>
          {config.disclaimer && <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-6">{config.disclaimer}</p>}
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// COUNTDOWN
// ════════════════════════════════════════════════════════
function CountdownModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.sm
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || '#9333ea' }}>
       <Deco type={config.decoration || 'grid'} />
       <div className={`relative z-10 ${mw} mx-auto text-center text-white`}>
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} mb-12 tracking-tighter leading-none`}>{config.title || 'Falta poco'}</h2>
          <div className="grid grid-cols-4 gap-4 sm:gap-8 mb-16">
             {['Días', 'Horas', 'Min', 'Seg'].map((unit, i) => (
               <div key={i} className="p-4 sm:p-8 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                  <p className="text-4xl sm:text-6xl font-black tracking-tight">00</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{unit}</p>
               </div>
             ))}
          </div>
          <Buttons buttons={[{ id: '1', text: config.btnText || 'Más Info', url: config.btnUrl || '#', style: 'outline' }]} config={config} />
       </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// OTROS COMPONENTES YA DEFINIDOS (PRICING, GALLERY, ETC.)
// ════════════════════════════════════════════════════════
function FeaturesModule({ config }: { config: any }) {
  const cols = config.columns === 2 ? 'sm:grid-cols-2' : config.columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto`}>
        <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 text-center tracking-tighter`}>{config.title || 'Servicios'}</h2>
        <div className={`grid grid-cols-1 ${cols} gap-8`}>
          {(config.cards || []).map((card: any, i: number) => (
            <div key={i} className="group p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 shadow-2xl">
              <div className="text-6xl mb-12 group-hover:rotate-12 transition-transform">{card.emoji || '✨'}</div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase">{card.title}</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">{card.paragraphs?.[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden border-t border-white/5`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto`}>
        <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 text-center tracking-tighter`}>{config.title || 'Tarifas'}</h2>
        <div className="space-y-24">
          {(config.categories || []).map((cat: any, ci: number) => (
            <div key={ci}>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-purple-500 mb-8 px-4 border-l-2 border-purple-500">{cat.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(cat.items || []).map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-8 bg-zinc-950 border border-white/5 rounded-[2rem] hover:border-white/20 transition-all group">
                    <div>
                      <p className="text-white font-black text-xl mb-1">{item.name}</p>
                      <p className="text-zinc-500 text-sm">{item.description}</p>
                    </div>
                    <span className="text-3xl font-black text-white whitespace-nowrap">{item.price}{config.currency || '€'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto`}>
        <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 text-center tracking-tighter`}>{config.title || 'Equipo'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(config.members || []).map((m: any, i: number) => (
            <div key={i} className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center hover:bg-white/[0.05] transition-all">
              <div className="w-40 h-40 rounded-[2.5rem] mx-auto mb-10 overflow-hidden relative border-4 border-white/5 group-hover:scale-105 transition-transform">
                {m.imageUrl ? <Image src={m.imageUrl} alt={m.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl">👤</div>}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 uppercase">{m.name}</h3>
              <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-8">{m.role}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryModule({ config }: { config: any }) {
  const py = getPy(config, 'sm')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.full
  return (
    <section className={`${py} px-2 relative`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2`}>
          {(config.images || []).map((img: any, i: number) => (
             <div key={i} className="aspect-square relative overflow-hidden group rounded-[2rem]">
                {img.url ? <Image src={img.url} alt="Gallery" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" /> : <div className="w-full h-full bg-zinc-900" />}
             </div>
          ))}
       </div>
    </section>
  )
}

function ContactModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const settings = config._global
  
  // Lógica de Sincronización Global vs Específica
  const isGlobal = config.useGlobalContact ?? true
  
  const address = isGlobal ? (settings?.address || "") : (config.address || settings?.address || "")
  const city = isGlobal ? (settings?.city || "") : (settings?.city || "")
  const province = isGlobal ? (settings?.province || "") : ""
  const country = isGlobal ? (settings?.country || "") : ""
  
  const fullAddress = [address, city, province, country].filter(Boolean).join(", ")
  
  const phones = isGlobal ? (settings?.contactPhones || []) : (config.contactPhones || (config.phone ? [config.phone] : []) || settings?.contactPhones || [])
  const email = isGlobal ? settings?.contactEmail : (config.email || settings?.contactEmail)
  const mapUrl = isGlobal ? settings?.locationMapUrl : (config.mapEmbedUrl || settings?.locationMapUrl)

  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center`}>
          <div>
             <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-12 tracking-tighter uppercase leading-none`}>{config.title || 'Contacto'}</h2>
             <div className="space-y-10">
                {fullAddress && (
                  <div className="flex gap-6">
                    <span className="text-3xl shrink-0">📍</span>
                    <div>
                       <p className="text-zinc-500 uppercase font-black text-[10px] tracking-widest mb-1">Localización</p>
                       <p className="text-white text-2xl font-black leading-tight">{fullAddress}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-6">
                  <span className="text-3xl shrink-0">📞</span>
                  <div>
                     <p className="text-zinc-500 uppercase font-black text-[10px] tracking-widest mb-1">Contacto</p>
                     <div className="space-y-2">
                        {phones.length > 0 ? (
                          phones.map((p: string, i: number) => <p key={i} className="text-white text-2xl font-black">{p}</p>)
                        ) : <p className="text-white text-2xl font-black">Llámanos</p>}
                        {email && <p className="text-purple-400 font-bold text-lg mt-2 underline underline-offset-8 decoration-purple-500/30 font-mono italic">{email}</p>}
                     </div>
                  </div>
                </div>
             </div>
          </div>
          <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl bg-zinc-900">
             {mapUrl ? <iframe src={mapUrl} className="absolute inset-0 w-full h-full grayscale invert opacity-70" allowFullScreen loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-8xl">🗺️</div>}
          </div>
       </div>
    </section>
  )
}

function CtaBannerModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <Deco type={config.decoration || 'blob'} />
       <div className={`${mw} mx-auto relative z-10 text-center space-y-8`}>
          {config.badgeText && <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] border border-white/10">{config.badgeText}</span>}
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white tracking-tighter leading-[0.9]`}>{config.title || '¡Acción inmediata!'}</h2>
          <p className={`text-white/60 ${ts(config).subtitle} font-medium max-w-2xl mx-auto`}>{config.subtitle}</p>
          <div className="flex justify-center pt-4">
             <Buttons buttons={config.buttons} config={config} />
          </div>
       </div>
    </section>
  )
}

function SocialLinksModule({ config }: { config: any }) {
  const py = getPy(config, 'sm')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10 text-center`}>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">{config.title || 'Síguenos'}</h2>
          <p className="text-zinc-500 mb-12 uppercase font-bold text-xs tracking-widest">{config.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {(config.socials || []).map((s: any, i: number) => (
               <a key={i} href={s.url || '#'} target="_blank" rel="noopener noreferrer" className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                  <div className="text-left">
                     <p className="text-zinc-500 text-[10px] uppercase font-black mb-1">{s.platform}</p>
                     <p className="text-white font-black text-lg group-hover:text-purple-400 transition-colors">{s.label}</p>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
               </a>
             ))}
          </div>
       </div>
    </section>
  )
}

function TextColumnsModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const cols = config.columns === 2 ? 'md:grid-cols-2' : config.columns === 3 ? 'md:grid-cols-3' : 'grid-cols-1'
  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10`}>
          {config.title && <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 tracking-tighter uppercase`}>{config.title}</h2>}
          <div className={`grid grid-cols-1 ${cols} gap-12 sm:gap-20`}>
             {(config.blocks || []).map((b: any, i: number) => (
               <div key={i} className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight pb-4 border-b border-white/5">{b.title}</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed">{b.body}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function BookingModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  const settings = config._global
  
  // Sincronización Global
  const isGlobal = config.useGlobalBooking ?? true
  const primaryPhone = isGlobal ? (settings?.contactPhones?.[0] || "") : (config.phone || settings?.contactPhones?.[0] || "")
  const whatsappPhone = isGlobal ? (settings?.contactPhones?.[0] || "") : (config.whatsapp || settings?.contactPhones?.[0] || "")

  return (
    <section className={`${py} px-4 relative overflow-hidden`} style={{ backgroundColor: config.color || 'transparent' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 ${mw} mx-auto text-center`}>
        <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-6 tracking-tighter leading-none`}>{config.title || 'Reserva Online'}</h2>
         {config.subtitle && <p className={`text-zinc-500 ${ts(config).subtitle} font-medium mb-16 uppercase tracking-widest`}>{config.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
           {config.showWhatsapp && whatsappPhone && (
             <a href={`https://wa.me/${whatsappPhone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group hover:bg-green-600/10 hover:border-green-500/30 transition-all text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-6xl">💬</div>
                <span className="text-5xl block mb-8 group-hover:scale-110 transition-transform relative z-10">💬</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1 relative z-10">WhatsApp directo</p>
                <p className="text-white font-black text-2xl relative z-10">{whatsappPhone}</p>
             </a>
           )}
           {config.showPhone && primaryPhone && (
             <a href={`tel:${primaryPhone}`} className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group hover:bg-purple-600/10 hover:border-purple-500/30 transition-all text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-6xl">📱</div>
                <span className="text-5xl block mb-8 group-hover:scale-110 transition-transform relative z-10">📱</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1 relative z-10">Llámanos ahora</p>
                <p className="text-white font-black text-2xl relative z-10">{primaryPhone}</p>
             </a>
           )}
        </div>
        {config.showBookingBtn && (
          <a href={config.bookingBtnUrl || '#'} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-6 bg-white text-black font-black text-lg uppercase tracking-[0.2em] rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-all">
            {config.bookingBtnText || 'Agendar Cita'}
          </a>
        )}
      </div>
    </section>
  )
}

function ReviewsModule({ config }: { config: any }) {
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.md
  return (
    <section className={`${py} px-4 relative overflow-hidden border-t border-white/5`} style={{ backgroundColor: config.color || 'transparent' }}>
       <div className={`${mw} mx-auto relative z-10`}>
          <h2 className={`${ts(config).title} ${ts(config).weight} ${ts(config).style} text-white mb-16 tracking-tighter text-center`}>{config.title || 'Reseñas'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {(config.reviews || []).map((r: any, i: number) => (
               <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                  <Stars n={r.rating} />
                  <p className="text-white text-lg font-medium leading-relaxed italic">"{r.text}"</p>
                  <p className="text-white font-black uppercase text-xs tracking-widest">{r.author}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function FooterModule({ config }: { config: any }) {
  const settings = config._global
  const py = getPy(config, 'md')
  const mw = MAX_WIDTH[config.maxWidth] || MAX_WIDTH.lg
  
  // Sincronización de Identidad
  const businessName = config.useGlobalBrand ? (settings?.businessName || config.businessName) : (config.businessName || settings?.businessName)
  const copyright = config.useGlobalBrand 
    ? `© ${new Date().getFullYear()} ${businessName}. Todos los derechos reservados.`
    : (config.copyrightText || `© ${new Date().getFullYear()} ${businessName}`)

  const useGlobalSocials = config.useGlobalSocials ?? true
  const socials = useGlobalSocials ? settings : (config.socials || {})
  
  const phones = settings?.contactPhones || []

  return (
    <footer className={`${py} px-8 border-t border-white/5 relative`} style={{ backgroundColor: config.bgColor || 'transparent' }}>
      <div className={`${mw} mx-auto flex flex-col items-center text-center gap-12 relative z-10`}>
        <h2 className="text-5xl font-black text-white tracking-widest uppercase">{businessName || 'Mi Negocio'}</h2>
        
        <div className="flex flex-col gap-2">
          {settings?.contactEmail && <p className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4">{settings.contactEmail}</p>}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {phones.map((p: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                 <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px]">📞</span>
                 <p className="text-white font-black text-xl tracking-tighter">{p}</p>
              </div>
            ))}
          </div>
          {settings?.address && (
            <p className="text-zinc-500 text-sm mt-6 flex items-center justify-center gap-2">
               <span className="opacity-50">📍</span>
               {settings.address}, {settings.city} ({settings.country})
            </p>
          )}
        </div>

        <div className="flex gap-4">
           {['instagram', 'facebook', 'tiktok', 'twitter', 'whatsapp'].map(s => {
             const url = useGlobalSocials ? settings?.[s+'Url'] : socials[s]
             if (!url || typeof url !== 'string') return null
             return (
               <a key={s} href={url} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-3xl bg-zinc-900 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all group">
                  <span className="font-black uppercase text-[10px] tracking-tighter">{s.slice(0,3)}</span>
                  <span className="text-[8px] opacity-40 group-hover:opacity-100 transition-opacity uppercase font-bold">Ver</span>
               </a>
             )
           })}
        </div>

        {config.showCopyright && (
          <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-12 opacity-50">
            {copyright}
          </p>
        )}
      </div>
    </footer>
  )
}

// ════════════════════════════════════════════════════════
// MOTOR PRINCIPAL
// ════════════════════════════════════════════════════════
export default async function HomePage() {
  const mods = await db.module.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } })
  // Parche de seguridad: Si Prisma no se ha generado con el nuevo modelo, usamos null
  const settings = await (db as any).settings?.findUnique({ where: { id: "global" } }).catch(() => null)

  const announcement = mods.find((m: any) => m.type === 'announcement')
  const navbar = mods.find((m: any) => m.type === 'navbar')
  const footer = mods.find((m: any) => m.type === 'footer')
  const body = mods.filter((m: any) => !['announcement', 'navbar', 'footer'].includes(m.type))

  const navBrand = (navbar?.config as any)?.brand
  const useGlobal = navBrand?.applyGlobal ?? !!settings

  const primary = settings?.primaryColor || navBrand?.primary || '#7c3aed'
  const secondary = settings?.secondaryColor || navBrand?.secondary || '#06b6d4'
  const background = settings?.backgroundColor || navBrand?.background || '#000000'

  const globalStyles = useGlobal ? (
    <style dangerouslySetInnerHTML={{ __html: `
      :root {
        --brand-primary: ${primary};
        --brand-secondary: ${secondary};
        --brand-bg: ${background};
      }
      .bg-brand-primary { background-color: var(--brand-primary); }
      .text-brand-primary { color: var(--brand-primary); }
    `}} />
  ) : null

  const render = (mod: any) => {
    const config = { 
      ...mod.config, 
      _global: { 
        ...settings, 
        primary, 
        secondary, 
        background,
        applyGlobal: useGlobal 
      } 
    }
    
    switch (mod.type) {
      case 'hero':        return <HeroModule      key={mod.id} config={config} />
      case 'features':    return <FeaturesModule  key={mod.id} config={config} />
      case 'pricing':     return <PricingModule   key={mod.id} config={config} />
      case 'gallery':     return <GalleryModule   key={mod.id} config={config} />
      case 'team':        return <TeamModule      key={mod.id} config={config} />
      case 'booking':     return <BookingModule   key={mod.id} config={config} />
      case 'contact':     return <ContactModule   key={mod.id} config={config} />
      case 'reviews':     return <ReviewsModule   key={mod.id} config={config} />
      case 'schedule':    return <ScheduleModule  key={mod.id} config={config} />
      case 'stats':       return <StatsModule     key={mod.id} config={config} />
      case 'faq':         return <FaqModule       key={mod.id} config={config} />
      case 'steps':       return <StepsModule     key={mod.id} config={config} />
      case 'video':       return <VideoModule     key={mod.id} config={config} />
      case 'image_text':  return <ImageTextModule key={mod.id} config={config} />
      case 'newsletter':  return <NewsletterModule key={mod.id} config={config} />
      case 'countdown':   return <CountdownModule key={mod.id} config={config} />
      case 'cta_banner':  return <CtaBannerModule key={mod.id} config={config} />
      case 'social_links': return <SocialLinksModule key={mod.id} config={config} />
      case 'text_columns': return <TextColumnsModule key={mod.id} config={config} />
      default:            return <section key={mod.id} className="py-20 text-center text-zinc-800 uppercase font-black text-[10px] tracking-widest border-y border-white/5 opacity-20">{mod.type} component active</section>
    }
  }

  // Wrapper que aplica TODOS los controles visuales del usuario
  const renderWrapped = (mod: any) => {
    const originalConfig = mod.config as any
    const c = { ...originalConfig }
    const t = ts(c)
    const wrapStyle: React.CSSProperties = {}
    
    if (t.fontFamily) wrapStyle.fontFamily = `'${t.fontFamily}', sans-serif`
    if (t.heightPx > 0) {
      wrapStyle.height = `${t.heightPx}px`
      wrapStyle.overflow = 'hidden'
    }
    if (c.paddingYPx != null && c.paddingYPx >= 0) {
      wrapStyle.paddingTop = `${c.paddingYPx}px`
      wrapStyle.paddingBottom = `${c.paddingYPx}px`
    }
    if (c.paddingXPx != null && c.paddingXPx >= 0) {
      wrapStyle.paddingLeft = `${c.paddingXPx}px`
      wrapStyle.paddingRight = `${c.paddingXPx}px`
    }
    if (c.marginTopPx) wrapStyle.marginTop = `${c.marginTopPx}px`
    if (t.mb) wrapStyle.marginBottom = t.mb

    const alignClass = c.textAlign === 'left' ? 'text-left' : c.textAlign === 'right' ? 'text-right' : ''

    const hasBgImage = !!c.backgroundImageUrl

    // Si hay imagen de fondo en el contenedor estricto, borramos el color del módulo para que no la tape
    if (hasBgImage) {
      c.color = 'transparent'
      c.bgColor = 'transparent'
    }

    return (
      <div key={mod.id + '-wrap'} className={`relative overflow-hidden w-full ${alignClass}`} style={wrapStyle}>
        {hasBgImage && (
           <>
             <div className="absolute inset-0 z-0 pointer-events-none">
               <Image src={c.backgroundImageUrl} alt="Fondo de módulo" fill sizes="100vw" 
                 className={`object-${c.bgSize || 'cover'} w-full h-full`} 
                 style={{ objectPosition: c.bgPosition || 'center' }} priority />
             </div>
             <div className="absolute inset-0 z-[1] bg-black pointer-events-none" style={{ opacity: c.imageOverlayOpacity ?? 0.6 }} />
           </>
        )}
        <div className="relative z-10 w-full h-full">
           {render({ ...mod, config: c })}
        </div>
      </div>
    )
  }

  // Recopilar todas las Google Fonts usadas por los módulos
  const googleFonts = new Set<string>()
  body.forEach(mod => { const ff = (mod.config as any)?.fontFamily; if (ff) googleFonts.add(ff) })

  return (
    <main className="min-h-screen selection:bg-purple-500 selection:text-white" style={{ backgroundColor: background }}>
      {globalStyles}
      {/* Cargar Google Fonts usadas por los módulos */}
      {Array.from(googleFonts).map(font => (
        <link key={font} rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;600;700;800;900&display=swap`} />
      ))}
      {announcement && <AnnouncementModule config={announcement.config as any} />}
      {navbar && <NavbarModule config={{ ...(navbar.config as any), _global: settings }} />}
      {body.map(renderWrapped)}
      {footer && <FooterModule config={{ ...(footer.config as any), _global: settings }} />}
    </main>
  )
}
