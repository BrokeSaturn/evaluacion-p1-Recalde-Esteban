const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const bookingRouter = require("./bookings");

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/bookings", bookingRouter);
// Monta aquí tus routers de los hitos 2, 3 y 4

module.exports = router;
