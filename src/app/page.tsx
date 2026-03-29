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
  return <span>{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < n ? 'text-yellow-400' : 'text-zinc-600'}>★</span>)}</span>
}

// ─── OptimizedImage — wrapper de next/image con fallback ────────────────────
function OptImg({ src, alt, className, fill }: { src: string; alt: string; className?: string; fill?: boolean }) {
  if (!src) return <div className={`${className} bg-zinc-800 flex items-center justify-center text-4xl`}>🖼️</div>
  if (fill) return (
    <Image src={src} alt={alt} fill className={`object-cover ${className || ''}`} sizes="(max-width:768px) 100vw, 50vw" />
  )
  return <Image src={src} alt={alt} width={800} height={600} className={`w-full h-full object-cover ${className || ''}`} />
}

// ─── Botones genéricos ───────────────────────────────────────────────────────
function Buttons({ buttons, size = 'lg' }: { buttons?: any[]; size?: 'sm' | 'lg' }) {
  if (!buttons?.length) return null
  const base = size === 'lg' ? 'px-8 py-4 text-base font-bold rounded-full transition-all hover:scale-105 active:scale-95' : 'px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:opacity-80'
  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((btn: any) => {
        const s = btn.style
        const cls = s === 'outline' || s === 'outlined'
          ? `${base} border-2 border-white/40 text-white hover:bg-white/10`
          : s === 'ghost'
          ? `${base} text-white hover:bg-white/10`
          : `${base} bg-white text-zinc-950 shadow-2xl`
        return <a key={btn.id} href={btn.url || '#'} target={btn.openNewTab ? '_blank' : undefined} rel={btn.openNewTab ? 'noopener noreferrer' : undefined} className={cls}>{btn.text}</a>
      })}
    </div>
  )
}

// ════════════════════════════════════════════════════════
// ANNOUNCEMENT BAR
// ════════════════════════════════════════════════════════
function AnnouncementModule({ config }: { config: any }) {
  return (
    <div className="w-full py-2.5 px-4 text-center text-sm font-semibold flex items-center justify-center gap-3 flex-wrap" style={{ backgroundColor: config.bgColor || '#7c3aed', color: config.textColor || '#fff' }}>
      <span>{config.text}</span>
      {config.link && config.linkText && <a href={config.link} className="underline hover:no-underline font-bold">{config.linkText} →</a>}
    </div>
  )
}

// ════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════
function NavbarModule({ config }: { config: any }) {
  const logoSize = config.logoSize === 'sm' ? 'text-lg' : config.logoSize === 'lg' ? 'text-3xl' : 'text-2xl'
  const pos = config.position === 'fixed' ? 'fixed' : config.position === 'relative' ? 'relative' : 'sticky'
  const bgValue = config.bgOpacity === 'transparent' ? 'transparent' : config.bgOpacity === 'blur' ? `${config.bgColor || '#000'}cc` : (config.bgColor || '#000')
  const btns: any[] = config.buttons || (config.showCta ? [{ id: '0', text: config.ctaText || 'Contactar', url: config.ctaUrl || '#', style: config.ctaStyle || 'filled' }] : [])

  return (
    <header className={`${pos} top-0 left-0 right-0 z-50 ${config.bgOpacity === 'blur' ? 'backdrop-blur-xl' : ''} ${config.showBorder ? 'border-b border-white/10' : ''}`} style={{ backgroundColor: bgValue }}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 ${config.layout === 'centered' ? 'flex flex-col items-center gap-3' : 'flex items-center justify-between gap-6'}`}>
        {/* Logo */}
        {(config.showLogo ?? true) && (
          <a href="#" className="flex items-center gap-3 shrink-0">
            {config.logoImageUrl ? (
              <div className="relative h-9 w-24">
                <Image src={config.logoImageUrl} alt={config.logoText || 'Logo'} fill className="object-contain" sizes="96px" />
              </div>
            ) : null}
            {!config.logoImageUrl && <span className={`font-black tracking-tighter ${logoSize}`} style={{ color: config.textColor || '#fff' }}>{config.logoText || 'Mi Empresa'}</span>}
            {config.logoImageUrl && config.logoText && <span className={`font-black tracking-tighter ${logoSize} hidden sm:inline`} style={{ color: config.textColor || '#fff' }}>{config.logoText}</span>}
          </a>
        )}

        {/* Links — ocultos en móvil */}
        {config.layout !== 'minimal' && (config.links || []).length > 0 && (
          <nav className="hidden md:flex items-center gap-6">
            {(config.links || []).map((l: any) => (
              <a key={l.id} href={l.url || '#'} target={l.openNewTab ? '_blank' : undefined} rel={l.openNewTab ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium hover:opacity-70 transition whitespace-nowrap" style={{ color: config.textColor || '#fff' }}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        {/* CTA Buttons */}
        {btns.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {btns.map((btn: any) => {
              const filled = btn.style !== 'outline' && btn.style !== 'outlined' && btn.style !== 'ghost'
              const outlined = btn.style === 'outline' || btn.style === 'outlined'
              return (
                <a key={btn.id} href={btn.url || '#'}
                  className={`text-sm font-bold rounded-full px-4 py-2 transition ${filled ? 'shadow-md hover:opacity-90' : outlined ? 'border hover:opacity-80' : 'hover:opacity-70'}`}
                  style={filled ? { backgroundColor: config.textColor || '#fff', color: config.bgColor || '#000' } : { borderColor: config.textColor || '#fff', color: config.textColor || '#fff' }}>
                  {btn.text}
                </a>
              )
            })}
          </div>
        )}

        {/* Hamburger móvil */}
        <button className="md:hidden p-2 rounded-lg" style={{ color: config.textColor || '#fff' }} aria-label="Menú">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </header>
  )
}

// ════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════
function HeroModule({ config }: { config: any }) {
  const align = config.textAlign === 'left' ? 'text-left items-start' : config.textAlign === 'right' ? 'text-right items-end' : 'text-center items-center'
  const bgSolid = config._global ? 'var(--brand-bg)' : (config.color || '#1a0533')
  const bgStyle = config.useGradient
    ? { background: `linear-gradient(135deg, ${config._global ? 'var(--brand-bg)' : (config.color || '#1a0533')}, ${config.gradientColor2 || '#0f172a'})` }
    : { backgroundColor: bgSolid }
  const btns = config.buttons || (config.showPrimaryBtn !== false ? [{ id: '0', text: config.primaryBtnText || 'Ver más', url: config.primaryBtnUrl || '#', style: 'primary' }] : [])

  return (
    <section className="relative overflow-hidden py-32 sm:py-40 md:py-60 px-4 flex items-center min-h-[80vh]" style={{
      ...bgStyle,
      backgroundImage: config.backgroundImageUrl ? `url(${config.backgroundImageUrl})` : undefined,
      backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
      {config.backgroundImageUrl && <div className="absolute inset-0 z-0" style={{ backgroundColor: `rgba(0,0,0,${config.imageOverlayOpacity ?? 0.55})` }} />}
      <Deco type={config.decoration} />
      <div className={`relative z-10 max-w-5xl mx-auto flex flex-col ${align} gap-6`}>
        {config.preTitleBadge && <span className="inline-block bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">{config.preTitleBadge}</span>}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg max-w-4xl">{config.title || 'Bienvenidos'}</h1>
        {config.subtitle && <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl">{config.subtitle}</p>}
        <Buttons buttons={btns} />
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// FEATURES
// ════════════════════════════════════════════════════════
function FeaturesModule({ config }: { config: any }) {
  const cols = config.columns === 2 ? 'sm:grid-cols-2' : config.columns === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
  const cardCls = config.cardStyle === 'light' ? 'bg-white border border-zinc-200' : config.cardStyle === 'bordered' ? 'border-2 border-white/20' : 'bg-white/5 border border-white/10'
  const txt = config.cardStyle === 'light' ? 'text-zinc-900' : 'text-white'
  const sub = config.cardStyle === 'light' ? 'text-zinc-500' : 'text-white/60'
  const accent = config._global ? 'var(--brand-primary)' : '#a855f7'
  
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#18181b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">{config.title || 'Servicios'}</h2>
          {config.subtitle && <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">{config.subtitle}</p>}
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-5`}>
          {(config.cards || []).map((card: any, i: number) => (
            <div key={card.id || i} className={`p-6 sm:p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 ${cardCls}`}>
              {card.emoji && <div className="text-4xl mb-6">{card.emoji}</div>}
              <h3 className={`font-bold text-xl sm:text-2xl mb-2 ${txt}`}>{card.title}</h3>
              {card.subtitle && <p className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: accent }}>{card.subtitle}</p>}
              {(card.paragraphs?.length > 0)
                ? <div className="space-y-2">{card.paragraphs.map((p: string, pi: number) => <p key={pi} className={`text-sm leading-relaxed ${sub}`}>{p}</p>)}</div>
                : card.description && <p className={`text-sm leading-relaxed ${sub}`}>{card.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// IMAGE + TEXT
// ════════════════════════════════════════════════════════
function ImageTextModule({ config }: { config: any }) {
  const reversed = config.layout === 'image_right'
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#18181b' }}>
      <Deco type={config.decoration} />
      <div className={`relative z-10 max-w-6xl mx-auto flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 sm:gap-16`}>
        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            {config.imageUrl ? <Image src={config.imageUrl} alt={config.imageAlt || ''} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" /> : <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-6xl">🖼️</div>}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {config.badge && <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">{config.badge}</span>}
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{config.title}</h2>
          {(config.paragraphs || []).map((p: string, i: number) => <p key={i} className="text-white/70 leading-relaxed">{p}</p>)}
          <Buttons buttons={config.buttons} size="sm" />
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// TEXT COLUMNS
// ════════════════════════════════════════════════════════
function TextColumnsModule({ config }: { config: any }) {
  const cols = config.columns === 3 ? 'sm:grid-cols-3' : config.columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#18181b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-6xl mx-auto">
        {config.title && <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">{config.title}</h2>}
        <div className={`grid grid-cols-1 ${cols} gap-8`}>
          {(config.blocks || []).map((b: any, i: number) => (
            <div key={b.id || i}>
              {b.title && <h3 className="font-bold text-xl text-white mb-3">{b.title}</h3>}
              <p className="text-white/60 leading-relaxed text-sm">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// REVIEWS
// ════════════════════════════════════════════════════════
function ReviewsModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#09090b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-16 sm:mb-20 text-center tracking-tighter">{config.title || 'Reseñas'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(config.reviews || []).map((r: any, i: number) => (
            <div key={r.id || i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
              <Stars n={r.rating || 5} />
              <p className="text-white/80 italic text-sm flex-1">"{r.text}"</p>
              <div><p className="text-white font-bold text-sm">{r.author}</p>{r.role && <p className="text-zinc-500 text-xs">{r.role}</p>}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// SCHEDULE
// ════════════════════════════════════════════════════════
function ScheduleModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#18181b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-12 sm:mb-16 text-center tracking-tighter">{config.title || 'Horario'}</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {(config.days || []).map((d: any, i: number) => (
            <div key={i} className={`flex items-center justify-between px-5 sm:px-7 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
              <span className="font-semibold text-white">{d.day}</span>
              {d.closed ? <span className="text-red-400 text-xs font-bold px-3 py-1 bg-red-500/10 rounded-full">Cerrado</span> : <span className="text-white/70 text-sm font-mono">{d.open} — {d.close}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// PRICING
// ════════════════════════════════════════════════════════
function PricingModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#09090b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-16 sm:mb-20 text-center tracking-tighter">{config.title || 'Precios'}</h2>
        <div className="space-y-12">
          {(config.categories || []).map((cat: any) => (
            <div key={cat.id}>
              <h3 className="text-sm font-black mb-6 uppercase tracking-[0.3em]" style={{ color: config._global ? 'var(--brand-primary)' : '#a855f7' }}>{cat.name}</h3>
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {(cat.items || []).map((item: any, i: number) => (
                  <div key={item.id || i} className={`flex items-center justify-between px-5 sm:px-7 py-4 gap-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm sm:text-base">{item.name}</p>
                      {item.description && <p className="text-white/50 text-xs sm:text-sm">{item.description}</p>}
                    </div>
                    <span className="text-lg sm:text-xl font-black text-white shrink-0">{item.price}{config.currency || '€'}</span>
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

// ════════════════════════════════════════════════════════
// GALLERY
// ════════════════════════════════════════════════════════
function GalleryModule({ config }: { config: any }) {
  const cols = config.columns === 2 ? 'grid-cols-2' : config.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#18181b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-7xl mx-auto">
        {config.title && <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 text-center tracking-tighter">{config.title}</h2>}
        {config.subtitle && <p className="text-white/60 text-center mb-10 sm:mb-12">{config.subtitle}</p>}
        <div className={`grid ${cols} gap-2 sm:gap-3`}>
          {(config.images || []).map((img: any, i: number) => (
            <div key={img.id || i} className="aspect-square rounded-xl overflow-hidden bg-zinc-800 relative group">
              {img.url && <Image src={img.url} alt={img.alt || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 50vw, 33vw" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// TEAM
// ════════════════════════════════════════════════════════
function TeamModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#18181b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">{config.title || 'Equipo'}</h2>
        {config.subtitle && <p className="text-white/60 text-lg sm:text-xl mb-12 sm:mb-16">{config.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(config.members || []).map((m: any, i: number) => (
            <div key={m.id || i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 bg-white/10 overflow-hidden relative">
                {m.imageUrl ? <Image src={m.imageUrl} alt={m.name} fill className="object-cover" sizes="96px" /> : <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>}
              </div>
              <h3 className="text-white font-bold text-lg">{m.name}</h3>
              <p className="text-purple-400 text-sm font-semibold mb-3">{m.role}</p>
              {m.bio && <p className="text-white/60 text-sm leading-relaxed">{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// STATS
// ════════════════════════════════════════════════════════
function StatsModule({ config }: { config: any }) {
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#6b21a8' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
        {(config.stats || []).map((s: any, i: number) => (
          <div key={s.id || i}>
            <p className="text-3xl sm:text-5xl font-extrabold text-white mb-2">{s.number}</p>
            <p className="text-white/70 text-xs sm:text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// CTA BANNER
// ════════════════════════════════════════════════════════
function CtaBannerModule({ config }: { config: any }) {
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#1a0533' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {config.badgeText && <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">{config.badgeText}</span>}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">{config.title}</h2>
        {config.subtitle && <p className="text-white/70 text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">{config.subtitle}</p>}
        <Buttons buttons={config.buttons || [{ id: '0', text: config.btnText || 'Reservar', url: config.btnUrl || '#', style: 'primary' }]} />
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// STEPS
// ════════════════════════════════════════════════════════
function StepsModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: config._global ? 'var(--brand-bg)' : (config.color || '#18181b') }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">{config.title || '¿Cómo funciona?'}</h2>
        {config.subtitle && <p className="text-white/60 text-lg sm:text-xl mb-12 sm:mb-16">{config.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 sm:mt-12">
          {(config.steps || []).map((s: any, i: number) => (
            <div key={s.id || i} className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <span className="text-xl sm:text-2xl font-black text-purple-400">{s.number}</span>
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-white mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// BOOKING
// ════════════════════════════════════════════════════════
function BookingModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#1a0533' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">{config.title || 'Reserva tu Cita'}</h2>
        {config.subtitle && <p className="text-white/70 text-base sm:text-lg mb-10 sm:mb-12">{config.subtitle}</p>}
        <div className="flex flex-col gap-4">
          {config.showPhone && <a href={`tel:${config.phone}`} className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl text-base sm:text-lg hover:bg-white/20 transition">📞 {config.phone}</a>}
          {config.showWhatsapp && <a href={`https://wa.me/${(config.whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-green-600/20 border border-green-500/30 text-green-300 font-semibold rounded-2xl text-base sm:text-lg hover:bg-green-600/30 transition">💬 WhatsApp</a>}
          {config.showEmail && <a href={`mailto:${config.email}`} className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl text-base sm:text-lg hover:bg-white/20 transition">✉️ {config.email}</a>}
          {config.showBookingBtn && <a href={config.bookingBtnUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-purple-600 text-white font-bold rounded-2xl text-base sm:text-lg hover:bg-purple-500 transition shadow-lg shadow-purple-600/30">{config.bookingBtnText || 'Reservar Online'}</a>}
        </div>
        {config.note && <p className="mt-8 text-white/40 text-sm">{config.note}</p>}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════
function FaqModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#09090b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 sm:mb-16 text-center">{config.title || 'FAQ'}</h2>
        <div className="space-y-4">
          {(config.faqs || []).map((faq: any, i: number) => (
            <div key={faq.id || i} className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="font-bold text-base sm:text-lg text-white mb-3 flex gap-3">
                <span style={{ color: config.accentColor || '#a855f7' }} className="shrink-0">Q.</span>{faq.question}
              </h3>
              <p className="text-white/70 pl-7 leading-relaxed text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// CONTACT
// ════════════════════════════════════════════════════════
function ContactModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#18181b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-3xl mx-auto text-center bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 flex items-center justify-center rounded-2xl mx-auto mb-6 text-3xl sm:text-4xl">📬</div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">{config.title || 'Contacto'}</h2>
        <div className="flex flex-col items-center gap-4">
          {config.phone && <a href={`tel:${config.phone}`} className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm sm:text-base">📞 {config.phone}</a>}
          {config.email && <a href={`mailto:${config.email}`} className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-600/20 text-purple-300 rounded-full font-medium hover:bg-purple-600/40 transition border border-purple-500/30 text-sm sm:text-base">✉️ {config.email}</a>}
          {config.showWhatsapp && config.whatsapp && <a href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition text-sm sm:text-base">💬 WhatsApp</a>}
          {config.address && <p className="text-white/50 text-sm">📍 {config.address}</p>}
          {config.showSocials && (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {config.instagram && <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition font-medium text-sm">Instagram</a>}
              {config.facebook && <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition font-medium text-sm">Facebook</a>}
              {config.tiktok && <a href={config.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition font-medium text-sm">TikTok</a>}
            </div>
          )}
        </div>
        {config.mapEmbedUrl && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 h-52 sm:h-64">
            <iframe src={config.mapEmbedUrl} className="w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa" />
          </div>
        )}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// VIDEO
// ════════════════════════════════════════════════════════
function VideoModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#09090b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {config.title && <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{config.title}</h2>}
        {config.subtitle && <p className="text-white/60 mb-10">{config.subtitle}</p>}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ maxWidth: `${config.maxWidth || 900}px`, margin: '0 auto' }}>
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe src={config.videoUrl} className="absolute inset-0 w-full h-full" allowFullScreen title={config.title || 'Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// NEWSLETTER
// ════════════════════════════════════════════════════════
function NewsletterModule({ config }: { config: any }) {
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#1a0533' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{config.title || 'Suscríbete'}</h2>
        {config.subtitle && <p className="text-white/70 mb-8">{config.subtitle}</p>}
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder={config.placeholder || 'tu@email.com'} className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          <button type="submit" className="px-6 py-3.5 bg-white text-zinc-950 font-bold rounded-xl hover:opacity-90 transition text-sm whitespace-nowrap">{config.btnText || 'Suscribirme'}</button>
        </form>
        {config.disclaimer && <p className="text-white/30 text-xs mt-4">{config.disclaimer}</p>}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// COUNTDOWN
// ════════════════════════════════════════════════════════
function CountdownModule({ config }: { config: any }) {
  return (
    <section className="py-20 sm:py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#09090b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3">{config.title || 'Próximamente'}</h2>
        {config.subtitle && <p className="text-white/60 text-lg mb-10">{config.subtitle}</p>}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 mb-10 max-w-sm mx-auto">
          {['Días', 'Horas', 'Min', 'Seg'].map((u, i) => (
            <div key={u} className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
              <p className="text-3xl sm:text-5xl font-extrabold text-white">--</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-1 uppercase tracking-wider">{u}</p>
            </div>
          ))}
        </div>
        {config.btnText && <a href={config.btnUrl || '#'} className="px-8 py-4 bg-white text-zinc-950 font-black rounded-full hover:scale-105 transition shadow-2xl">{config.btnText}</a>}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// SOCIAL LINKS
// ════════════════════════════════════════════════════════
const SOCIAL_ICONS: Record<string, string> = { instagram: '📸', facebook: '👥', tiktok: '🎵', twitter: '🐦', youtube: '▶️', linkedin: '💼', whatsapp: '💬', pinterest: '📌' }
function SocialLinksModule({ config }: { config: any }) {
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden" style={{ backgroundColor: config.color || '#18181b' }}>
      <Deco type={config.decoration} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {config.title && <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{config.title}</h2>}
        {config.subtitle && <p className="text-white/60 mb-10">{config.subtitle}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {(config.socials || []).map((s: any) => (
            <a key={s.id} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition group">
              <span className="text-2xl">{SOCIAL_ICONS[s.platform] || '🔗'}</span>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition">{s.label || s.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════
function FooterModule({ config }: { config: any }) {
  const s = config.socials || {}
  const bg = config._global ? 'var(--brand-bg)' : (config.bgColor || '#09090b')
  const txt = config.textColor || '#fff'
  return (
    <footer className="py-16 sm:py-24 px-4 border-t border-white/5" style={{ backgroundColor: bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10 sm:mb-12">
          <div>
            <p className="text-xl sm:text-2xl font-black mb-2" style={{ color: config.textColor || '#fff' }}>{config.businessName || 'Mi Empresa'}</p>
            {config.tagline && <p className="text-sm" style={{ color: `${config.textColor || '#fff'}80` }}>{config.tagline}</p>}
          </div>
          {(config.links || []).length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {(config.links || []).map((l: any) => <a key={l.id} href={l.url || '#'} className="text-sm hover:opacity-80 transition" style={{ color: `${config.textColor || '#fff'}90` }}>{l.label}</a>)}
            </nav>
          )}
          <div className="flex gap-3">
            {s.instagram && <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">📸</a>}
            {s.facebook && <a href={s.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">👥</a>}
            {s.tiktok && <a href={s.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">🎵</a>}
            {s.twitter && <a href={s.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">🐦</a>}
            {s.whatsapp && <a href={`https://wa.me/${s.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">💬</a>}
          </div>
        </div>
        {config.showCopyright && (
          <div className="pt-6 sm:pt-8 border-t" style={{ borderColor: `${config.textColor || '#fff'}10` }}>
            <p className="text-xs sm:text-sm" style={{ color: `${config.textColor || '#fff'}40` }}>{config.copyrightText}</p>
          </div>
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

  const announcement = mods.find((m: any) => m.type === 'announcement')
  const navbar = mods.find((m: any) => m.type === 'navbar')
  const footer = mods.find((m: any) => m.type === 'footer')
  const body = mods.filter((m: any) => !['announcement', 'navbar', 'footer'].includes(m.type))

  // Extraer Branding Global
  const brand = navbar?.config?.brand
  const useGlobal = brand?.applyGlobal ?? false

  const globalStyles = useGlobal ? (
    <style dangerouslySetInnerHTML={{ __html: `
      :root {
        --brand-primary: ${brand.primary || '#7c3aed'};
        --brand-secondary: ${brand.secondary || '#06b6d4'};
        --brand-accent: ${brand.accent || '#f59e0b'};
        --brand-bg: ${brand.background || '#09090b'};
      }
      .bg-brand-primary { background-color: var(--brand-primary); }
      .bg-brand-secondary { background-color: var(--brand-secondary); }
      .bg-brand-bg { background-color: var(--brand-bg); }
      .text-brand-primary { color: var(--brand-primary); }
      .text-brand-accent { color: var(--brand-accent); }
      .border-brand-primary { border-color: var(--brand-primary); }
    `}} />
  ) : null

  const render = (mod: any) => {
    // Si useGlobal es true, inyectamos la marca en el config del módulo para que sepa que debe priorizarla
    const config = useGlobal ? { ...mod.config, _global: brand } : mod.config

    switch (mod.type) {
      case 'hero':        return <HeroModule      key={mod.id} config={config} />
      case 'features':    return <FeaturesModule  key={mod.id} config={config} />
      case 'image_text':  return <ImageTextModule key={mod.id} config={config} />
      case 'text_columns':return <TextColumnsModule key={mod.id} config={config} />
      case 'reviews':     return <ReviewsModule   key={mod.id} config={config} />
      case 'schedule':    return <ScheduleModule  key={mod.id} config={config} />
      case 'pricing':     return <PricingModule   key={mod.id} config={config} />
      case 'gallery':     return <GalleryModule   key={mod.id} config={config} />
      case 'team':        return <TeamModule      key={mod.id} config={config} />
      case 'stats':       return <StatsModule     key={mod.id} config={config} />
      case 'cta_banner':  return <CtaBannerModule key={mod.id} config={config} />
      case 'steps':       return <StepsModule     key={mod.id} config={config} />
      case 'booking':     return <BookingModule   key={mod.id} config={config} />
      case 'faq':         return <FaqModule       key={mod.id} config={config} />
      case 'contact':     return <ContactModule   key={mod.id} config={config} />
      case 'video':       return <VideoModule     key={mod.id} config={config} />
      case 'newsletter':  return <NewsletterModule key={mod.id} config={config} />
      case 'countdown':   return <CountdownModule key={mod.id} config={config} />
      case 'social_links':return <SocialLinksModule key={mod.id} config={config} />
      default:            return null
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: useGlobal ? 'var(--brand-bg)' : '#000' }}>
      {globalStyles}
      {announcement && <AnnouncementModule config={announcement.config} />}
      {navbar ? <NavbarModule config={navbar.config} /> : (
        <nav className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-black/80 backdrop-blur-xl border-b border-white/5">
          <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">Mi Empresa</span>
          <a href="/login" className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition">Panel Admin</a>
        </nav>
      )}
      
      {body.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-zinc-500 text-center px-4">
          <span className="text-5xl sm:text-6xl mb-6">🛠️</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Web en construcción</h2>
          <p className="text-sm sm:text-base">El administrador todavía no ha publicado ningún módulo.</p>
        </div>
      ) : body.map(render)}

      {footer && <FooterModule config={useGlobal ? { ...footer.config, _global: brand } : footer.config} />}
    </main>
  )
}
