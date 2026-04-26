import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productsController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), upload.single("image"), createProduct);
router.put("/:id", protect, authorize("admin"), upload.single("image"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);

export default router;