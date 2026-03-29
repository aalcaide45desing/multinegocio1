import { getSettings } from "./actions"
import SettingsForm from "./SettingsForm"

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Identidad de Marca</h1>
        <p className="text-zinc-500 mt-2 font-medium">Configura el ADN visual y el SEO de tu negocio en un solo lugar.</p>
      </header>

      <SettingsForm initialSettings={JSON.parse(JSON.stringify(settings))} />
    </div>
  )
}
