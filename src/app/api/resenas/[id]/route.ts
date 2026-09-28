import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { reviews } from "@/db/schema";
import { REVIEW_STATUSES } from "@/lib/reviews";

export const dynamic = "force-dynamic";

const MISSING_DB_MESSAGE =
  "El sistema de reseñas aún no está conectado a la base de datos. Contacta al administrador.";
const MISSING_DB_TOKEN = "Falta DATABASE_URL";

function isMissingDbError(error: unknown): boolean {
  return error instanceof Error && error.message.includes(MISSING_DB_TOKEN);
}

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

/**
 * Panel de moderación mínimo (API).
 * Autenticación por token: REVISAR ADMIN_TOKEN en el header `x-admin-token`.
 *
 * PATCH /api/resenas/[id]   body: { action: "approved" | "rejected" }
 * DELETE /api/resenas/[id]  elimina el comentario.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) return unauthorized();

  const { id } = await params;
  let body: { action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const action = body?.action;
  if (!action || !REVIEW_STATUSES.includes(action as (typeof REVIEW_STATUSES)[number])) {
    return NextResponse.json({ error: "Acción no válida." }, { status: 400 });
  }
  if (action === "pending") {
    return NextResponse.json({ error: "Usa approved o rejected." }, { status: 400 });
  }

  try {
    const [updated] = await getDb()
      .update(reviews)
      .set({ status: action })
      .where(eq(reviews.id, id))
      .returning({ id: reviews.id, status: reviews.status });
    if (!updated) {
      return NextResponse.json({ error: "Reseña no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, review: updated });
  } catch (error) {
    if (isMissingDbError(error)) {
      return NextResponse.json({ error: MISSING_DB_MESSAGE }, { status: 503 });
    }
    console.error("Error al moderar reseña:", error);
    return NextResponse.json({ error: "No se pudo actualizar la reseña." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) return unauthorized();

  const { id } = await params;
  try {
    const [deleted] = await getDb()
      .delete(reviews)
      .where(eq(reviews.id, id))
      .returning({ id: reviews.id });
    if (!deleted) {
      return NextResponse.json({ error: "Reseña no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (isMissingDbError(error)) {
      return NextResponse.json({ error: MISSING_DB_MESSAGE }, { status: 503 });
    }
    console.error("Error al eliminar reseña:", error);
    return NextResponse.json({ error: "No se pudo eliminar la reseña." }, { status: 500 });
  }
}