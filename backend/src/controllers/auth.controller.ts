import { Request, Response } from "express";
import { User } from "../models/user.model";
import { signToken } from "../utils/jwt";
import { setAuthCookie, clearAuthCookie } from "../utils/cookie";

// ─── Register ────────────────────────────────────────────────────────────────
export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409).json({ success: false, message: "Email already in use" });
    return;
  }

  const user = await User.create({ name, email, passwordHash: password });

  const token = signToken({
    sub: user.id as string,
    email: user.email,
    name: user.name,
  });

  setAuthCookie(res, token);

  res.status(201).json({
    success: true,
    message: "Account created",
    user: user.toJSON(),
  });
}

// ─── Login ───────────────────────────────────────────────────────────────────
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    // Deliberate vague message — don't reveal whether email exists
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const token = signToken({
    sub: user.id as string,
    email: user.email,
    name: user.name,
  });

  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Signed in",
    user: user.toJSON(),
  });
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logout(_req: Request, res: Response): Promise<void> {
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: "Signed out" });
}

// ─── Me ──────────────────────────────────────────────────────────────────────
export async function me(req: Request, res: Response): Promise<void> {
  // req.user is populated by authenticate middleware
  res.status(200).json({ success: true, user: req.user });
}
