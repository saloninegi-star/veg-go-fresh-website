import { useState } from "react";
import CategorySidebar from "../components/shared/CategorySidebar";
import HeroCarousel from "../components/home/HeroCarousel";
import HomeBottomSections from "../components/home/HomeBottomSection";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] =
    useState("vegetables");

  return (
    <main className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-5">

      {/* Hero Section */}
      <section
        className="
          w-full
          flex
          flex-col
          lg:flex-row
          gap-3
          sm:gap-4
          lg:gap-5
          items-stretch
        "
      >

        {/* Category Sidebar */}
        <div className="w-full lg:w-auto lg:shrink-0">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Hero Banner */}
        <div className="w-full flex-1 min-w-0">
          <HeroCarousel />
        </div>

      </section>

      {/* Bottom Sections */}
      <section className="mt-4 sm:mt-5 md:mt-6">
        <HomeBottomSections
          selectedCategory={selectedCategory}
        />
      </section>

    </main>
  );
}