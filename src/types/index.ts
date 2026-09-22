export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  featured: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  collection: string;
  aroma: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  benefits: string[];
  ingredients: string[];
  duration: string;
  usage: string;
  rating: number;
  reviews: number;
  images: string[];
  badges: string[];
  inStock: boolean;
  bestSeller: boolean;
  isNew: boolean;
  featured: boolean;
  material?: string;
  dimensions?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type SortOption = "featured" | "best" | "newest" | "price-asc" | "price-desc" | "name";

export type ShopFilters = {
  categories: string[];
  collections: string[];
  aromas: string[];
  maxPrice: number;
};
