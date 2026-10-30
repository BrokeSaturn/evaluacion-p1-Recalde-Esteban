const { Router } = require("express");
const { postSchedule, listBookings } = require("../controllers/adminController");
const authenticateToken = require("../middlewares/auth");

const router = Router();

router.post("/schedules", authenticateToken, postSchedule);
router.get("/bookings", authenticateToken, listBookings);

module.exports = router;