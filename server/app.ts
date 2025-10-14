import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import teacherRouter from "./routes/teacher";

const app = new Hono();

// CORS middleware - permette richieste dal frontend Vercel
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL || "*"],
    credentials: true,
  })
);

app.use(logger());

// Health check endpoint
app.get("/", (c) => {
  return c.json({
    message: "Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.route("/api/teachers", teacherRouter);

export default app;
