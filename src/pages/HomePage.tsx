import CategorySidebar from "../components/shared/CategorySidebar";
import HeroCarousel from "../components/home/HeroCarousel";
import FeatureStrip from "../components/home/FeatureStrip";
import FlashSaleCard from "../components/home/FlashSaleCard";
import BestSellers from "../components/home/BestSellers";
import MembershipCard from "../components/home/MembershipCard";
import PromoStrip from "../components/home/PromoStrip";

export default function HomePage() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 space-y-6 w-full">
      <section className="flex flex-col lg:flex-row gap-5 items-stretch relative">
        <CategorySidebar variant="home" />
        <HeroCarousel />
      </section>

      <FeatureStrip />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <FlashSaleCard />
        <BestSellers />
        <MembershipCard />
      </section>

      <PromoStrip />
    </main>
  );
}
