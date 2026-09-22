import type { Metadata } from "next";
import { WishlistPageContent } from "@/components/wishlist/WishlistPageContent";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tus velas y decoración favoritas de JULEHOME en un solo lugar.",
};

export default function FavoritosPage() {
  return <WishlistPageContent />;
}
