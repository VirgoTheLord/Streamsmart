import { Router } from "express";
import { body } from "express-validator";
import { register, login, logout, me } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate-request";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ max: 80 }).withMessage("Name must be 80 characters or fewer"),
    body("email")
      .trim()
      .isEmail().withMessage("Valid email is required")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  ],
  validateRequest,
  register
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail().withMessage("Valid email is required")
      .normalizeEmail(),
    body("password")
      .notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

// POST /api/auth/logout
router.post("/logout", logout);

// GET /api/auth/me  — returns current user from cookie (useful for frontend hydration)
router.get("/me", authenticate, me);

export default router;
