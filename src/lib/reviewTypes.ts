export type ReviewPublic = {
  id: string;
  nombre: string;
  comentario: string;
  rating: number;
  productId: string | null;
  status: string;
  createdAt: string;
};

export type ReviewSummary = {
  average: number;
  count: number;
};

export type ReviewFormValues = {
  nombre: string;
  rating: number;
  comentario: string;
  productId?: string | null;
};

export const REVIEW_SUCCESS_MESSAGE =
  "¡Gracias por compartir tu experiencia! Tu opinión será revisada antes de aparecer publicada.";