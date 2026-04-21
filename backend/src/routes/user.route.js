import { Router } from "express";
import {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

// address routes
router.post("/addresses", protectRoute, addAddress);
router.get("/addresses", protectRoute, getAddresses);
router.put("/addresses/:addressId", protectRoute, updateAddress);
router.delete("/addresses/:addressId", protectRoute, deleteAddress);

// wishlist routes
router.post("/wishlist", protectRoute, addToWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);
router.get("/wishlist", protectRoute, getWishlist);

export default router;
