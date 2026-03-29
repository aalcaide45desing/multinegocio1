import { PrismaClient } from "@prisma/client"

async function run() {
  const p = new PrismaClient()
  await p.$connect()
  console.log("Success with simple instanciation")
  await p.$disconnect()
}

run()
