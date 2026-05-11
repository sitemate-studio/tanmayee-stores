import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrustStrip from "@/components/home/TrustStrip";
import SectionLabel from "@/components/home/SectionLabel";
import CtaBar from "@/components/home/CtaBar";

import { PRODUCTS } from "@/data/products";

export default function Home() {
  const productData = PRODUCTS;

  const newArrivals = productData.filter(
    (p) => p.is_new_arrival
  );

  return (
    <>
      <HeroSection />

      {newArrivals.length > 0 && (
        <>
          <SectionLabel text="New Arrivals" />
          <NewArrivals products={newArrivals} />
        </>
      )}

      <SectionLabel text="Shop by Category" />
      <CategoryGrid />

      <TrustStrip />

      <CtaBar />
    </>
  );
}
