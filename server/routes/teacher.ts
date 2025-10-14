import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { teachers } from "../mock/users";

const app = new Hono();
const userSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(1),
  age: z.number().min(18).max(100),
});

const teacherSchema = userSchema.omit({ id: true });

app.get("/", (c) => c.json(teachers));

app.get("///:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));

  const teacher = teachers.find((teacher) => teacher.id === id);

  return c.json(teacher);
});

app.post("/", zValidator("json", teacherSchema), (c) => {
  const user = c.req.valid("json");

  teachers.push({ ...user, id: teachers.length + 1 });

  return c.json(teachers);
});

app.delete("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));

  const teacher = teachers.find((teacher) => teacher.id === id);

  return c.json(teacher);
});
// app.put("/api/teachers/:id", validator("param", { id: "number" }), (c) => {
//   const id = c.req.param("id");
//   const teacher = teachers.find((teacher) => teacher.id === parseInt(id));
//   return c.json(teacher);
// });
// app.delete("/api/teachers/:id", validator("param", { id: "number" }), (c) => {
//   const id = c.req.param("id");
//   const teacher = teachers.find((teacher) => teacher.id === parseInt(id));
//   return c.json(teacher);
// });

export default app;
