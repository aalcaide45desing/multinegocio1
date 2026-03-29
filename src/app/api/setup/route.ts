import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function GET() {
  // Por seguridad, este endpoint solo funciona mientras estamos programando (en local).
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "La auto-creación de usuarios solo está permitida en desarrollo." }, { status: 403 })
  }

  const email = "admin@tuempresa.com"
  const password = "admin"
  
  const existingUser = await db.user.findUnique({ where: { email } })
  
  if (existingUser) {
    return NextResponse.json({ message: "El usuario administrador ya existe. Puedes ir a Iniciar Sesión.", credentials: { email, password } })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  await db.user.create({
    data: {
      email,
      name: "Administrador Principal",
      password: hashedPassword,
      role: "ADMIN"
    }
  })

  return NextResponse.json({
    message: "¡Éxito! Usuario administrador creado.",
    credentials: {
      email: email,
      password: password
    },
    siguientePaso: "Ve a http://localhost:3000/login e introduce esos datos."
  })
}
