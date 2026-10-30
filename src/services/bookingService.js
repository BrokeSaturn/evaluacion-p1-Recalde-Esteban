const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const createBooking = async (date, scheduleId, userId) => {
  const occupied = await prisma.booking.findFirst({
    where: { date: new Date(date), scheduleId: Number(scheduleId) },
  });
  if (occupied) {
    throw new Error("El horario ya está ocupado");
  }
  const booking = await prisma.booking.create({
    data: {
      date: new Date(date),
      scheduleId: Number(scheduleId),
      userId: userId,
    },
  });
  return booking;
};

const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: { id: id },
    include: { schedule: true },
  });
  return booking;
};

const updateBooking = async (id, date, scheduleId) => {
  const occupied = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      scheduleId: Number(scheduleId),
      id: { not: id },
    },
  });
  if (occupied) {
    throw new Error("El horario ya está ocupado");
  }
  const booking = await prisma.booking.update({
    where: { id: id },
    data: { date: new Date(date), scheduleId: Number(scheduleId) },
  });
  return booking;
};

const deleteBooking = async (id) => {
  await prisma.booking.delete({ where: { id: id } });
};

module.exports = { createBooking, getBookingById, updateBooking, deleteBooking };