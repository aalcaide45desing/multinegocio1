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

export async function getSettings() {
  try {
    let settings = await (db as any).settings?.findUnique({ where: { id: "global" } })
    if (!settings && (db as any).settings) {
      settings = await (db as any).settings.create({
        data: {
          id: "global",
          siteTitle: "Mi Negocio",
          siteDescription: "Bienvenido a nuestro sitio web oficial.",
          businessName: "Mi Empresa",
          primaryColor: "#7c3aed",
          secondaryColor: "#06b6d4"
        }
      })
    }
    return settings || {
      siteTitle: "Mi Negocio",
      siteDescription: "Bienvenido a nuestro sitio web oficial.",
      businessName: "Mi Empresa",
      primaryColor: "#7c3aed",
      secondaryColor: "#06b6d4",
      contactPhones: [],
      city: "",
      province: "",
      country: "",
      locationMapUrl: ""
    }
  } catch (e) {
    return {
      siteTitle: "Mi Negocio",
      siteDescription: "Bienvenido a nuestro sitio web oficial.",
      businessName: "Mi Empresa",
      primaryColor: "#7c3aed",
      secondaryColor: "#06b6d4",
      contactPhones: [],
      city: "",
      province: "",
      country: "",
      locationMapUrl: ""
    }
  }
}

export async function updateSettings(data: any) {
  await verifyAdmin()
  try {
    const settings = await (db as any).settings?.upsert({
      where: { id: "global" },
      update: data,
      create: { id: "global", ...data }
    })
    revalidatePath("/admin/settings")
    revalidatePath("/")
    return settings
  } catch (e) {
    console.error("No se pudo guardar la configuración: El modelo Settings no existe todavía en el cliente Prisma.")
    return null
  }
}

