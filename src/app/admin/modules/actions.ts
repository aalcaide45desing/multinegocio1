"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Acceso denegado: Se requiere ser Administrador.")
  }
}

async function triggerVercelRebuild() {
  const webhookUrl = process.env.VERCEL_DEPLOY_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, { method: "POST" });
    console.log("🚀 Vercel Webhook disparado correctamente.");
  } catch (err) {
    console.error("⚠️ Error disparando Webhook de Vercel:", err);
  }
}

export async function toggleModuleStatus(id: string, currentStatus: boolean) {
  await verifyAdmin()
  await db.module.update({ where: { id }, data: { isActive: !currentStatus } })
  revalidatePath("/admin/modules")
  revalidatePath("/")
}

export async function createModule(type: string, name: string, order: number) {
  await verifyAdmin()
  let defaultConfig: any = {}

  switch (type) {

    case "navbar":
      defaultConfig = {
        logoText: "Mi Empresa", logoImageUrl: "", logoSize: "md", showLogo: true,
        links: [
          { id: "1", label: "Inicio",    url: "#inicio",    openNewTab: false },
          { id: "2", label: "Servicios", url: "#servicios", openNewTab: false },
          { id: "3", label: "Contacto",  url: "#contacto",  openNewTab: false }
        ],
        buttons: [
          { id: "1", text: "Reservar cita", url: "#contacto", style: "filled", openNewTab: false }
        ],
        bgColor: "#000000", bgOpacity: "solid", textColor: "#ffffff",
        showBorder: false, position: "sticky", layout: "standard",
        brand: {
          primary:    "#7c3aed",
          secondary:  "#06b6d4",
          accent:     "#f59e0b",
          background: "#09090b",
          text:       "#ffffff",
          applyGlobal: false   
        }
      }
      break

    case "hero":
      defaultConfig = {
        preTitleBadge: "", title: "Bienvenidos a Nuestro Negocio",
        subtitle: "Calidad, confianza y buen servicio desde el primer día.",
        paddingY: "xl", maxWidth: "md",
        textAlign: "center", backgroundImageUrl: "", imageOverlayOpacity: 0.55,
        color: "#1a0533", useGradient: false, gradientColor2: "#0f172a", decoration: "none",
        buttons: [
          { id: "1", text: "Ver Servicios", url: "#servicios", style: "primary" },
          { id: "2", text: "Llámanos",      url: "tel:+34600000000", style: "outline" }
        ]
      }
      break

    case "features":
      defaultConfig = {
        title: "Nuestros Servicios", subtitle: "Todo lo que necesitas en un solo lugar",
        paddingY: "md", maxWidth: "md",
        color: "#18181b", decoration: "none", columns: 3, cardStyle: "glass",
        cards: [
          { id: "1", emoji: "✂️", title: "Servicio Premium",  subtitle: "El más elegido",  paragraphs: ["Atención personalizada de calidad."] },
          { id: "2", emoji: "⭐", title: "Experiencia",       subtitle: "10 años de trayectoria", paragraphs: ["Profesionales con amplia experiencia."] },
          { id: "3", emoji: "💎", title: "Exclusividad",      subtitle: "Solo para ti",     paragraphs: ["Tratamientos únicos adaptados a cada cliente."] }
        ]
      }
      break

    case "reviews":
      defaultConfig = {
        title: "Lo que dicen nuestros clientes", color: "#09090b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        reviews: [
          { id: "1", author: "María G.",   role: "Cliente habitual", rating: 5, text: "Un servicio increíble. Muy recomendable para todo tipo de ocasiones." },
          { id: "2", author: "Carlos M.",  role: "Nuevo cliente",    rating: 5, text: "Quedé encantado con la atención. Volveré sin duda." }
        ]
      }
      break

    case "schedule":
      defaultConfig = {
        title: "Nuestro Horario", color: "#18181b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        days: [
          { day: "Lunes",     open: "09:00", close: "20:00", closed: false },
          { day: "Martes",    open: "09:00", close: "20:00", closed: false },
          { day: "Miércoles", open: "09:00", close: "20:00", closed: false },
          { day: "Jueves",    open: "09:00", close: "20:00", closed: false },
          { day: "Viernes",   open: "09:00", close: "21:00", closed: false },
          { day: "Sábado",    open: "10:00", close: "14:00", closed: false },
          { day: "Domingo",   open: "",      close: "",      closed: true  }
        ]
      }
      break

    case "pricing":
      defaultConfig = {
        title: "Tarifas y Precios", color: "#09090b", decoration: "none", currency: "€",
        paddingY: "md", maxWidth: "md",
        categories: [
          {
            id: "1", name: "Servicios Básicos",
            items: [
              { id: "1a", name: "Servicio Estándar", description: "Atención personalizada", price: "15" },
              { id: "1b", name: "Servicio Premium",  description: "Atención VIP sin esperas", price: "25" }
            ]
          }
        ]
      }
      break

    case "gallery":
      defaultConfig = {
        title: "Nuestra Galería", subtitle: "Descubre nuestro trabajo",
        paddingY: "sm", maxWidth: "full",
        color: "#18181b", decoration: "none", columns: 3,
        images: [
          { id: "1", url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", alt: "Imagen 1" },
          { id: "2", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", alt: "Imagen 2" }
        ]
      }
      break

    case "team":
      defaultConfig = {
        title: "Nuestro Equipo", subtitle: "Profesionales apasionados por su trabajo",
        paddingY: "md", maxWidth: "md",
        color: "#18181b", decoration: "none",
        members: [
          { id: "1", name: "Ana López",   role: "Directora & Especialista", imageUrl: "", bio: "Más de 10 años de experiencia en el sector." },
          { id: "2", name: "Carlos Ruiz", role: "Especialista Senior",      imageUrl: "", bio: "Formado en las mejores escuelas nacionales." }
        ]
      }
      break

    case "stats":
      defaultConfig = {
        color: "#6b21a8", decoration: "blob",
        paddingY: "sm", maxWidth: "md",
        stats: [
          { id: "1", number: "500+",  label: "Clientes satisfechos" },
          { id: "2", number: "10",    label: "Años de experiencia" },
          { id: "3", number: "100%",  label: "Satisfacción garantizada" },
          { id: "4", number: "5★",    label: "Valoración media" }
        ]
      }
      break

    case "cta_banner":
      defaultConfig = {
        badgeText: "🔥 OFERTA LIMITADA",
        title: "¡Reserva esta semana con un 10% de descuento!",
        subtitle: "Solo por tiempo limitado. No pierdas esta oportunidad.",
        paddingY: "md", maxWidth: "md",
        color: "#1a0533", decoration: "blob",
        buttons: [
          { id: "1", text: "Reservar Ahora",  url: "#contacto",  style: "primary" },
          { id: "2", text: "Más información", url: "#servicios", style: "outline" }
        ]
      }
      break

    case "steps":
      defaultConfig = {
        title: "¿Cómo funciona?", subtitle: "Sencillo y rápido",
        paddingY: "md", maxWidth: "md",
        color: "#18181b", decoration: "none",
        steps: [
          { id: "1", number: "01", title: "Contacta con nosotros",  description: "Llámanos, escríbenos o reserva directamente online." },
          { id: "2", number: "02", title: "Cuéntanos qué necesitas", description: "Nuestro equipo te asesorará sin compromiso." },
          { id: "3", number: "03", title: "¡Disfruta del resultado!", description: "Sal satisfecho con un servicio excelente." }
        ]
      }
      break

    case "booking":
      defaultConfig = {
        title: "Reserva tu Cita", subtitle: "Estamos aquí para atenderte. Elige cómo contactarte.",
        paddingY: "md", maxWidth: "md",
        color: "#1a0533", decoration: "blob",
        showPhone: true, phone: "+34 600 000 000",
        showWhatsapp: true, whatsapp: "+34 600 000 000",
        showEmail: false, email: "",
        showBookingBtn: false, bookingBtnText: "Reservar Online", bookingBtnUrl: "",
        note: "Atención Lunes a Sábado de 9:00 a 20:00"
      }
      break

    case "contact":
      defaultConfig = {
        title: "Contacta con nosotros", color: "#18181b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        email: "info@tuempresa.com", phone: "+34 600 000 000",
        showWhatsapp: false, whatsapp: "",
        address: "", mapEmbedUrl: "",
        showSocials: false, instagram: "", facebook: "", tiktok: "", twitter: ""
      }
      break

    case "faq":
      defaultConfig = {
        title: "Preguntas Frecuentes", color: "#09090b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        accentColor: "#a855f7",
        faqs: [
          { id: "1", question: "¿Necesito reserva previa?",         answer: "Recomendamos reservar con antelación, aunque también atendemos sin cita según disponibilidad." },
          { id: "2", question: "¿Cuáles son las formas de pago?",   answer: "Aceptamos efectivo, tarjeta y transferencia bancaria." }
        ]
      }
      break

    case "footer":
      defaultConfig = {
        businessName: "Mi Empresa", tagline: "Calidad y confianza desde el primer día.",
        bgColor: "#09090b", textColor: "#ffffff",
        links: [
          { id: "1", label: "Inicio",    url: "#inicio" },
          { id: "2", label: "Servicios", url: "#servicios" },
          { id: "3", label: "Contacto",  url: "#contacto" }
        ],
        socials: { instagram: "", facebook: "", twitter: "", tiktok: "", whatsapp: "" },
        showCopyright: true,
        copyrightText: `© ${new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.`
      }
      break

    case "video":
      defaultConfig = {
        title: "Conócenos Mejor", subtitle: "Un vistazo a lo que hacemos",
        paddingY: "md",
        color: "#09090b", decoration: "none",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        aspectRatio: "16/9", maxWidth: "md"
      }
      break

    case "image_text":
      defaultConfig = {
        color: "#18181b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        layout: "image_left",   
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        imageAlt: "Imagen descriptiva",
        badge: "", title: "Sobre Nosotros",
        paragraphs: [
          "Somos un negocio familiar con más de 10 años de experiencia en el sector.",
          "Nuestro compromiso es ofrecerte siempre el mejor servicio al mejor precio."
        ],
        buttons: [{ id: "1", text: "Saber más", url: "#contacto", style: "primary" }]
      }
      break

    case "newsletter":
      defaultConfig = {
        title: "¡No te pierdas nada!",
        subtitle: "Suscríbete para recibir nuestras últimas noticias y ofertas exclusivas.",
        paddingY: "md", maxWidth: "md",
        placeholder: "Tu correo electrónico",
        btnText: "Suscribirme",
        disclaimer: "Respetamos tu privacidad. Puedes darte de baja en cualquier momento.",
        color: "#1a0533", decoration: "blob"
      }
      break

    case "countdown":
      defaultConfig = {
        title: "La Gran Apertura", subtitle: "Prepárate para algo increíble",
        paddingY: "md", maxWidth: "md",
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        btnText: "Avisarme", btnUrl: "#contacto",
        color: "#09090b", decoration: "grid"
      }
      break

    case "social_links":
      defaultConfig = {
        title: "Síguenos en Redes", subtitle: "Estamos donde tú estás",
        paddingY: "sm", maxWidth: "md",
        color: "#18181b", decoration: "none",
        socials: [
          { id: "1", platform: "instagram", url: "", label: "@miempresa" },
          { id: "2", platform: "facebook",  url: "", label: "Mi Empresa" },
          { id: "3", platform: "tiktok",    url: "", label: "@miempresa" }
        ]
      }
      break

    case "text_columns":
      defaultConfig = {
        color: "#18181b", decoration: "none",
        paddingY: "md", maxWidth: "md",
        title: "Información Importante", columns: 2,
        blocks: [
          { id: "1", title: "Nuestra Misión",  body: "Ofrecer el mejor servicio de la zona con profesionalidad y calidez humana." },
          { id: "2", title: "Nuestra Visión",  body: "Ser el negocio de referencia en nuestro sector de aquí a 5 años." }
        ]
      }
      break

    case "announcement":
      defaultConfig = {
        text: "🎉 ¡Oferta especial! 20% de descuento toda esta semana. ¡Llámanos ahora!",
        bgColor: "#7c3aed", textColor: "#ffffff",
        link: "", linkText: "Ver oferta",
        dismissible: true, scrolling: false
      }
      break
  }

  await db.module.create({
    data: { name, type, config: defaultConfig, isActive: true, order }
  })

  revalidatePath("/admin/modules")
  revalidatePath("/")
}

export async function deleteModule(id: string) {
  await verifyAdmin()
  await db.module.delete({ where: { id } })
  revalidatePath("/admin/modules")
  revalidatePath("/")
}

export async function updateModuleConfig(id: string, newConfig: any) {
  await verifyAdmin()
  await db.module.update({ where: { id }, data: { config: newConfig } })
  revalidatePath("/admin/modules")
  revalidatePath(`/admin/modules/${id}`)
  revalidatePath("/")
  await triggerVercelRebuild()
}

export async function swapModuleOrder(idA: string, orderA: number, idB: string, orderB: number) {
  await verifyAdmin()
  await db.$transaction([
    db.module.update({ where: { id: idA }, data: { order: orderB } }),
    db.module.update({ where: { id: idB }, data: { order: orderA } }),
  ])
  revalidatePath("/admin/modules")
  revalidatePath("/")
}
