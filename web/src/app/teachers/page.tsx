import { fetchAPI } from "@/lib/api";
import type { Teacher } from "@/types/user";

// Rivalidazione ogni 60 secondi (ISR - Incremental Static Regeneration)
export const revalidate = 60;

export default async function TeachersPage() {
  try {
    const data = await fetchAPI<Teacher[]>("/api/teachers");

    return (
      <div>
        <h2>This is a page</h2>
        {data.map((teacher) => (
          <div key={teacher.id}>{teacher.name}</div>
        ))}
      </div>
    );
  } catch (error) {
    // Fallback durante il build se l'API non è disponibile
    return (
      <div>
        <h2>This is a page</h2>
        <p>
          Dati non disponibili al momento del build. La pagina verrà aggiornata
          automaticamente.
        </p>
      </div>
    );
  }
}
