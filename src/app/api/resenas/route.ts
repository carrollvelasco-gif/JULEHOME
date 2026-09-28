import { and, desc, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { reviews } from "@/db/schema";
import { hasSuspiciousContent, reviewSchema, sanitizeText } from "@/lib/reviews";

export const dynamic = "force-dynamic";

const MISSING_DB_MESSAGE =
  "El sistema de reseñas aún no está conectado a la base de datos. Contacta al administrador.";
const MISSING_DB_TOKEN = "Falta DATABASE_URL";

function isMissingDbError(error: unknown): boolean {
  return error instanceof Error && error.message.includes(MISSING_DB_TOKEN);
}

type ReviewRow = {
  id: string;
  nombre: string;
  comentario: string;
  rating: number;
  productId: string | null;
  status: string;
  createdAt: Date;
};

/** GET /api/resenas?productId=xxx  o  GET /api/resenas (generales) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId")?.trim() || null;

  try {
    const rows = await getDb()
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.status, "approved"),
          productId ? eq(reviews.productId, productId) : isNull(reviews.productId),
        ),
      )
      .orderBy(desc(reviews.createdAt));

    const data: ReviewRow[] = rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      comentario: r.comentario,
      rating: r.rating,
      productId: r.productId,
      status: r.status,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({ reviews: data });
  } catch (error) {
    if (isMissingDbError(error)) {
      return NextResponse.json({ error: MISSING_DB_MESSAGE }, { status: 503 });
    }
    console.error("Error al consultar reseñas:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar las reseñas en este momento." },
      { status: 500 },
    );
  }
}

/** POST /api/resenas — Guarda una reseña nueva con estado "pending" (moderación). */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
      },
      { status: 422 },
    );
  }

  const { nombre, rating, comentario, productId } = parsed.data;

  if (hasSuspiciousContent(comentario) || hasSuspiciousContent(nombre)) {
    return NextResponse.json(
      { error: "Tu comentario contiene contenido no permitido." },
      { status: 422 },
    );
  }

  const cleanNombre = sanitizeText(nombre);
  const cleanComentario = sanitizeText(comentario);
  const cleanProductId = productId ? sanitizeText(productId) : null;

  try {
    const [inserted] = await getDb()
      .insert(reviews)
      .values({
        nombre: cleanNombre,
        comentario: cleanComentario,
        rating,
        productId: cleanProductId,
        status: "pending",
      })
      .returning();

    return NextResponse.json(
      {
        ok: true,
        message:
          "¡Gracias por compartir tu experiencia! Tu opinión será revisada antes de aparecer publicada.",
        review: {
          id: inserted.id,
          nombre: inserted.nombre,
          comentario: inserted.comentario,
          rating: inserted.rating,
          productId: inserted.productId,
          status: inserted.status,
          createdAt: inserted.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (isMissingDbError(error)) {
      return NextResponse.json({ error: MISSING_DB_MESSAGE }, { status: 503 });
    }
    console.error("Error al guardar reseña:", error);
    return NextResponse.json(
      { error: "No se pudo guardar tu comentario. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}