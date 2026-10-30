const { Router } = require("express");
const { postBooking, getBooking, putBooking, removeBooking } = require("../controllers/bookingController");
const authenticateToken = require("../middlewares/auth");
const authorizeBooking = require("../middlewares/authorizeBooking");

const router = Router();

router.post("/", authenticateToken, postBooking);
router.get("/:id", authenticateToken, authorizeBooking, getBooking);
router.put("/:id", authenticateToken, authorizeBooking, putBooking);
router.delete("/:id", authenticateToken, authorizeBooking, removeBooking);

module.exports = router;