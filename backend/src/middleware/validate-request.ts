import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Runs after express-validator checks.
 * Returns a 422 with all field errors if validation failed.
 */
export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.type === "field" ? e.path : undefined,
        message: e.msg,
      })),
    });
    return;
  }
  next();
}
