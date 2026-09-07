import FeatureStrip from "./FeatureStrip";
import FlashSaleCard from "./FlashSaleCard";
import BestSellers from "./BestSellers";
import MembershipCard from "./MembershipCard";
import PromoStrip from "./PromoStrip";

interface HomeBottomSectionsProps {
  selectedCategory: string;
}

export default function HomeBottomSections({
  selectedCategory,
}: HomeBottomSectionsProps) {
  return (
    <div className="w-full space-y-4 sm:space-y-5">

      {/* Feature Strip */}
      <section className="w-full min-w-0">
        <FeatureStrip />
      </section>

      {/* Flash Sale + Best Sellers + Membership */}
      <section
        className="
          w-full
          grid
          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-[minmax(260px,350px)_minmax(0,1fr)_minmax(260px,350px)]

          gap-3
          sm:gap-4

          xl:h-[280px]
        "
      >

        {/* Flash Sale */}
        <div
          className="
            w-full
            min-w-0
            h-[260px]
            sm:h-[280px]
            md:h-[280px]
            xl:h-full

            md:col-start-1
            md:row-start-1

            xl:col-start-auto
            xl:row-start-auto
          "
        >
          <FlashSaleCard />
        </div>


        {/* Best Sellers */}
        <div
          className="
            w-full
            min-w-0
            h-[280px]

            md:col-span-2
            md:col-start-1
            md:row-start-2

            xl:col-span-1
            xl:col-start-auto
            xl:row-start-auto
          "
        >
          <BestSellers category={selectedCategory} />
        </div>


        {/* Membership */}
        <div
          className="
            w-full
            min-w-0
            h-[260px]
            sm:h-[280px]
            md:h-[280px]
            xl:h-full

            md:col-start-2
            md:row-start-1

            xl:col-start-auto
            xl:row-start-auto
          "
        >
          <MembershipCard />
        </div>

      </section>

      {/* Promo Strip */}
      <section className="w-full min-w-0">
        <PromoStrip />
      </section>

    </div>
  );
}