import { db } from "@/lib/db"
import Link from "next/link"

export default async function Dashboard() {
  const modsCount = await db.module.count({ where: { isActive: true } })
  const usersCount = await db.user.count()

  return (
    <>
      <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-bold text-white">Resumen del Sistema</h1>
        <p className="text-zinc-400 mt-1">Controla los módulos y la actividad de la plataforma desde un solo lugar.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta de métricas 1 */}
        <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <h3 className="text-zinc-400 font-medium mb-3 text-sm">Módulos Activos en el Front</h3>
          <p className="text-4xl font-bold text-white tracking-tight">{modsCount}</p>
        </div>

        {/* Tarjeta de métricas 2 */}
        <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
          <h3 className="text-zinc-400 font-medium mb-3 text-sm">Total Administradores</h3>
          <p className="text-4xl font-bold text-white tracking-tight">{usersCount}</p>
        </div>
      </div>

      <div className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <h2 className="text-lg font-semibold text-white mb-4">Estado del Front</h2>
        <div className="text-center py-10">
           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 mb-4">
              🧩
           </div>
           <p className="text-zinc-400 mb-4">
               {modsCount === 0 
                  ? "Todavía no has creado ningún módulo que los clientes puedan ver en el Front." 
                  : `Tienes ${modsCount} módulos renderizándose en la página principal ahora mismo.`}
           </p>
           <Link href="/admin/modules" className="inline-block px-4 py-2 bg-white text-zinc-950 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
             Ir a Gestión de Módulos
           </Link>
        </div>
      </div>
    </>
  )
}
