import app from "./server/app";

Bun.serve({
  fetch: app.fetch,
});
