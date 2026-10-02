import rateLimit from "express-rate-limit";

export const createEndpointLimiter = () =>
  rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please wait a moment and try again." },
  });
