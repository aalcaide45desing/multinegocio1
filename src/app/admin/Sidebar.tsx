"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/admin/dashboard", label: "Vista General", icon: "🎯" },
    { href: "/admin/modules", label: "Gestión de Módulos", icon: "🧩" },
    { href: "#", label: "Usuarios", icon: "👥" },
    { href: "#", label: "Identidad de Marca", icon: "⚙️" },
  ]

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {links.map((link) => {
        // Marcamos como activo si la ruta coincide o si empieza por esa ruta (ej: /admin/modules/blabla)
        const isActive = pathname === link.href || (link.href !== "#" && pathname.startsWith(link.href + "/") && link.href !== "/admin")
        
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive 
                ? "bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20" 
                : "text-zinc-400 border border-transparent hover:bg-white/5 hover:text-white transition-colors"
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">{link.icon}</span>
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
