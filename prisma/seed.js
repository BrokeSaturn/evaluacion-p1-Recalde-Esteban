require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Borrar en orden (primero las tablas hijas)
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  // 2. Usuarios con contraseña cifrada (bcrypt, costo 10)
  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const esteban = await prisma.user.create({
    data: {
      name: "Esteban Recalde",
      email: "esrecalde@espe.edu.ec",
      password: await bcrypt.hash("esteban123", 10),
      role: "USER",
    },
  });

  // 3. Horarios de mi variante (dígito 8: Fútbol 4 y Básquet 4, 2026-11-20)
  const futbol = await prisma.schedule.create({
    data: {
      court: "Fútbol 4",
      startTime: new Date("2026-11-20T08:00:00Z"),
      endTime: new Date("2026-11-20T10:00:00Z"),
    },
  });

  const basquet = await prisma.schedule.create({
    data: {
      court: "Básquet 4",
      startTime: new Date("2026-11-20T10:00:00Z"),
      endTime: new Date("2026-11-20T12:00:00Z"),
    },
  });

  // 4. Reservas usando connect
  await prisma.booking.create({
    data: {
      date: new Date("2026-11-20T00:00:00Z"),
      user: { connect: { id: esteban.id } },
      schedule: { connect: { id: futbol.id } },
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-20T00:00:00Z"),
      user: { connect: { id: admin.id } },
      schedule: { connect: { id: basquet.id } },
    },
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });