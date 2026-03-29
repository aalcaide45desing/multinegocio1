import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Sidebar from "./Sidebar"
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  // 1. Verificar si hay un usuario logueado
  if (!session || !session.user) {
    redirect("/login")
  }

  // 2. Controladores de Acceso por Rol (RBAC): Validar acceso solo para administradores
  if (session.user.role !== "ADMIN") {
    redirect("/") 
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Barra predeterminada del sistema lateral */}
      <aside className="w-64 bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800/50 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-sm">Panel Modular</h2>
        </div>
        <Sidebar />
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/40">
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-zinc-200">{session.user.name || "Admin"}</span>
                 <span className="text-xs text-zinc-500 truncate w-32">{session.user.email}</span>
              </div>
              <a href="/api/auth/signout" className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-red-500/20 transition-colors" title="Cerrar sesión">
                ⏻
              </a>
           </div>
        </div>
      </aside>

      {/* Área del contenedor principal donde los sub-archivos page.tsx renderizan */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  )
}
