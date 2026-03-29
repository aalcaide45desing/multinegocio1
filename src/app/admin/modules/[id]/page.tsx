import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import EditModuleClient from "./EditModuleClient"

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mod = await db.module.findUnique({ where: { id } })
  
  if (!mod) {
    redirect("/admin/modules")
  }

  // Recuperar configuración global para sincronización
  let settings = null
  try {
    settings = await (db as any).settings?.findUnique({ where: { id: "global" } })
  } catch (e) {
    console.error("No se pudo cargar Settings para el editor de módulos")
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
       <div className="flex items-center gap-4 mb-8">
          <a href="/admin/modules" className="p-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
             ←
          </a>
          <div>
            <h1 className="text-3xl font-bold text-white">Configuración del Módulo</h1>
            <p className="text-zinc-400 mt-1">
              Editando: <span className="font-medium text-purple-400">{mod.name}</span> <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded ml-2">Instancia: {mod.type}</span>
            </p>
          </div>
       </div>

       <div className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl relative">
          <p className="text-zinc-400 mb-8 leading-relaxed max-w-2xl">
            Modifica la información que se mostrará en este bloque de la plataforma pública. 
            Cualquier cambio se reflejará instantáneamente tras guardar.
          </p>
          
          <EditModuleClient mod={mod} initialSettings={settings} />
       </div>
    </div>
  )
}
