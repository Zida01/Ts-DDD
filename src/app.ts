import express from "express";
import { ENV } from "./shared/config/env";
import authRouter from "./auth/auth.routes";

import { errorHandler } from "./shared/errorhandler/globalerrorHandler";

const app = express();

// Middlewares
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: ENV.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/welcome", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: ENV.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "welcome to TS-DDD API",
  });
});

// add the routes
app.use("/v1/api/auth", authRouter);

// Global error handler (last middleware)
app.use(errorHandler);

app.use((req, res, next) => {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  next(error);
});

// Express error middleware
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 404).json({
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

export default app;
