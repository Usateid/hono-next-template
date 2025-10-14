import { Hono } from "hono";
import { logger } from "hono/logger";

import teacherRouter from "./routes/teacher";

const app = new Hono();

app.use(logger());

// API routes
app.route("/api/teachers", teacherRouter);

// Serve all static files and HTML pages
app.get("*", async (c) => {
  const path = new URL(c.req.url).pathname;

  // Try to serve the file directly (for static assets like JS, CSS, images)
  let file = Bun.file(`./web/dist${path}`);
  if (await file.exists()) {
    return new Response(file);
  }

  // Try to serve as HTML page
  file = Bun.file(`./web/dist${path}.html`);
  if (await file.exists()) {
    return c.html(await file.text());
  }

  // Try index.html for root
  if (path === "/") {
    file = Bun.file("./web/dist/index.html");
    if (await file.exists()) {
      return c.html(await file.text());
    }
  }

  // Return 404 page
  const notFound = Bun.file("./web/dist/404.html");
  if (await notFound.exists()) {
    return c.html(await notFound.text(), 404);
  }
  return c.notFound();
});

export default app;
