import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { teachers } from "../db/schema";

const app = new Hono();
const userSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(1),
  age: z.number().min(18).max(100),
});

const teacherSchema = userSchema.omit({ id: true });

app.get("/", async (c) => {
  const allTeachers = await db.select().from(teachers);
  return c.json(allTeachers);
});

app.get("/:id{[0-9]+}", async (c) => {
  const id = Number.parseInt(c.req.param("id"));

  const teacher = await db.select().from(teachers).where(eq(teachers.id, id));

  if (teacher.length === 0) {
    return c.json({ error: "Teacher not found" }, 404);
  }

  return c.json(teacher[0]);
});

app.post("/", zValidator("json", teacherSchema), async (c) => {
  const teacher = c.req.valid("json");

  const newTeacher = await db.insert(teachers).values(teacher).returning();

  return c.json(newTeacher[0], 201);
});

app.delete("/:id{[0-9]+}", async (c) => {
  const id = Number.parseInt(c.req.param("id"));

  const deletedTeacher = await db
    .delete(teachers)
    .where(eq(teachers.id, id))
    .returning();

  if (deletedTeacher.length === 0) {
    return c.json({ error: "Teacher not found" }, 404);
  }

  return c.json(deletedTeacher[0]);
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
