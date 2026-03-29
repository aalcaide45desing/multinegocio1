import { db } from "@/lib/db"
import ModulesClient from "./ModulesClient"

export default async function ModulesPage() {
  // Traer todos los módulos de la base de datos, ordenados según como se pintan en el cliente
  const modules = await db.module.findMany({
    orderBy: { order: "asc" }
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Secciones de tu Web</h1>
        <p className="text-zinc-400 max-w-2xl">
          Como administrador, puedes añadir bloques de diseño prefabricados a la página principal. Tras añadirlos, podrás editar sus textos, colores y fotos de forma segura sin romper la estructura de la web.
        </p>
      </header>
      
      {/* Componente de cliente que maneja la reactividad y los formularios */}
      <ModulesClient initialModules={modules} />
    </div>
  )
}
