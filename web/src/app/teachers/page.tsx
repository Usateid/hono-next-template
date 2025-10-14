import { fetchAPI } from "@/lib/api";
import type { Teacher } from "@/types/user";

export default async function TeachersPage() {
  const data = await fetchAPI<Teacher[]>("/api/teachers");

  return (
    <div>
      <h2>This is a page</h2>
      {data.map((teacher) => (
        <div key={teacher.id}>{teacher.name}</div>
      ))}
    </div>
  );
}
