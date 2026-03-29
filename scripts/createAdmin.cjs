const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@multinegocio.com';
    const plainPassword = 'admin'; // Contraseña temporal

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('El usuario ya existe:', existingUser.email);
      // Actualizar la contraseña por si acaso
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      await db.user.update({
        where: { email },
        data: { password: hashedPassword }
      });
      console.log('Contraseña reseteada a "admin".');
    } else {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      const user = await db.user.create({
        data: {
          name: 'CEO Admin',
          email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log('Usuario administrador creado con éxito:', user.email);
    }
  } catch (error) {
    console.error('Error creando el administrador:', error);
  } finally {
    await db.$disconnect();
  }
}

createAdmin();
