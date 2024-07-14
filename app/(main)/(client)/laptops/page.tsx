import Footer from "@/components/footer/footer";
import Map from "../_components/Map";
import ProductsFeed from "../_components/products-feed";
import ClientProductsFilter from "./_components/client-products-filter";
import ClientSearchFilter from "./_components/search-filter";
import { Analytics } from "@vercel/analytics/react";

async function LaptopsPage({
  searchParams,
}: {
  searchParams: { brand: string };
}) {
  return (
    <div className="w-full bg-[#FAFAFA]">
      <div className="inline-block lg:hidden sticky top-20 left-0 z-50 p-5 w-full bg-white">
        <ClientSearchFilter />
      </div>
      <div className="w-[90%] flex items-start gap-10 mx-auto relative mt-5 lg:mt-14">
        <div className="sticky w-full max-w-[300px] top-24 left-0 hidden lg:inline-block ">
          <ClientProductsFilter searchParams={searchParams.brand} />
        </div>
        <div className="w-full">
          <div className="hidden lg:block w-full max-w-[1700px] mx-auto">
            <ClientSearchFilter />
          </div>
          <ProductsFeed />
        </div>
      </div>
      <Analytics />
      <Map />
      <Footer />
    </div>
  );
}

export default LaptopsPage;
