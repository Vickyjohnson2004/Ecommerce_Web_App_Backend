// server.js
import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import cors from "cors";

import { functions, inngest } from "./config/inngest.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";

const app = express();
const __dirname = path.resolve();

// ----------------------
// 1️⃣ CORS (must come BEFORE Clerk middleware)
// ----------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8081",
  "https://ecommerce-web-silk.vercel.app",
  "https://ecommerce-m3zf6mgr8-victor-johnsons-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies to be sent
  }),
);

// ----------------------
// 2️⃣ JSON parser
// ----------------------
app.use(express.json());

// ----------------------
// 3️⃣ Clerk auth middleware
// ----------------------
app.use(clerkMiddleware());

// ----------------------
// 4️⃣ Payment routes (Stripe webhook raw body handling)
// ----------------------
app.use(
  "/api/payment",
  (req, res, next) => {
    if (req.originalUrl === "/api/payment/webhook") {
      express.raw({ type: "application/json" })(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  },
  paymentRoutes,
);

// ----------------------
// 5️⃣ Inngest server
// ----------------------
app.use("/api/inngest", serve({ client: inngest, functions }));

// ----------------------
// 6️⃣ API routes
// ----------------------
app.use("/api/admin", adminRoutes); // make sure admin routes use requireAuth({ redirectUrl: null })
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

// ----------------------
// 7️⃣ Production: serve frontend
// ----------------------
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  // Serve index.html for all unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  });
}

// ----------------------
// 8️⃣ Start server
// ----------------------
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
