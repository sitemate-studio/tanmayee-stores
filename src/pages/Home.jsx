import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrustStrip from "@/components/home/TrustStrip";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import SectionLabel from "@/components/home/SectionLabel";
import CtaBar from "@/components/home/CtaBar";

import { PRODUCTS } from "@/data/products.js";

export default function Home() {
  const productData = PRODUCTS;

  const galleryData = PRODUCTS
    .filter((p) => p.images?.[0])
    .map((p) => ({
      image_url: p.images[0],
      caption_en: p.name_en,
      caption_te: p.name_te,
      caption_hi: p.name_hi,
      category: p.category,
    }));

  const newArrivals = productData.filter(
    (p) => p.is_new_arrival
  );

  const displayProducts =
    newArrivals.length > 0
      ? newArrivals
      : productData.slice(0, 8);

  return (
    <>
      <HeroSection />

      <SectionLabel text="New Arrivals" />
      <NewArrivals products={displayProducts} />

      <SectionLabel text="Shop by Category" />
      <CategoryGrid />

      <TrustStrip />

      <SectionLabel text="From our collection" />
      <GalleryTeaser
        images={galleryData}
      />

      <CtaBar />
    </>
  );
}