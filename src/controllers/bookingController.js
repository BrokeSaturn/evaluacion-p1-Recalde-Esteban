const { createBooking, updateBooking, deleteBooking } = require("../services/bookingService");

const postBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;
    const booking = await createBooking(date, scheduleId, req.user.id);
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  return res.status(200).json(req.booking);
};

const putBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;
    const booking = await updateBooking(req.booking.id, date, scheduleId);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeBooking = async (req, res) => {
  await deleteBooking(req.booking.id);
  return res.status(204).send();
};

module.exports = { postBooking, getBooking, putBooking, removeBooking };