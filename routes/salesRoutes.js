import express from "express";
import { createSale, getSales, getMySales, getSalesByDate } from "../controllers/salesController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js"

const router = express.Router();

// Salesperson
router.post("/", protect, createSale);

// Admin
router.get("/", protect, authorize("admin"), getSales);

// Salesperson
router.get("/mine", protect, getMySales);

// Reports
router.get("/report", protect, authorize("admin"), getSalesByDate);

export default router; 