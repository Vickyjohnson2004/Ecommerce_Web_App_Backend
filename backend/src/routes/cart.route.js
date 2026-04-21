import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", protectRoute, getCart);
router.post("/", protectRoute, addToCart);
router.put("/:productId", protectRoute, updateCartItem);
router.delete("/:productId", protectRoute, removeFromCart);
router.delete("/", protectRoute, clearCart);

export default router;
