const { createSchedule, getAllBookings } = require("../services/adminService");

const postSchedule = async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }
  try {
    const { court, startTime, endTime } = req.body;
    const schedule = await createSchedule(court, startTime, endTime);
    return res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

const listBookings = async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }
  try {
    const bookings = await getAllBookings();
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = { postSchedule, listBookings };