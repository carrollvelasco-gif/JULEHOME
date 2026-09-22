import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionsShowcase } from "@/components/home/CollectionsShowcase";
import { ChristmasShowcase } from "@/components/home/ChristmasShowcase";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramMosaic } from "@/components/home/InstagramMosaic";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { SITE } from "@/lib/constants";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "es-ES",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CollectionsShowcase />
      <ChristmasShowcase />
      <AboutPreview />
      <Benefits />
      <Testimonials />
      <InstagramMosaic />
      <Newsletter />
      <ProductQuickView />
    </>
  );
}
