const express = require("express");
const router = express.Router();
const { checkDuplicateEvent, createEvent, getEvents, getEventById, deleteEvent, submitEventForm, verifyEventPassword } = require("../Controllers/EventController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Register `checkDuplicateEvent` route
router.get("/events/check-duplicate", authMiddleware, checkDuplicateEvent);

// ✅ Register other routes
router.post("/events", authMiddleware, createEvent);
router.get("/events", authMiddleware, getEvents);
router.get("/events/:id", authMiddleware, getEventById);
router.delete("/events/:id", authMiddleware, deleteEvent);
router.post("/events/submit-form", submitEventForm);
router.post("/events/verify-password", verifyEventPassword);
module.exports = router;
