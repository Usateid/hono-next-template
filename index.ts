import app from "./server/app";

const port = process.env.PORT || 3000;

Bun.serve({
  fetch: app.fetch,
  port: port,
});

console.log(`🚀 Server running on port ${port}`);
