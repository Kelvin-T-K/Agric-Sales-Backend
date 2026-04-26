import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create-user", protect, authorize("admin"), createUser);
router.get("/users", protect, authorize("admin"), getUsers);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

export default router;