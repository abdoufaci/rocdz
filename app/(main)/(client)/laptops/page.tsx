import Footer from "@/components/footer/footer";
import Map from "../_components/Map";
import ProductsFeed from "../_components/products-feed";
import ClientProductsFilter from "./_components/client-products-filter";
import ClientSearchFilter from "./_components/search-filter";
import { getMinMaxPrice } from "@/actions/queries/get-min-max-price";

async function LaptopsPage({
  searchParams,
}: {
  searchParams: { brand: string };
}) {
  const res = await getMinMaxPrice();
  return (
    <div className="w-full bg-[#FAFAFA]">
      <div className="inline-block lg:hidden sticky top-0 left-0 z-50 p-5 w-full bg-white">
        <ClientSearchFilter res={res} />
      </div>
      <div className="w-[90%] flex items-start gap-10 mx-auto relative mt-5 lg:mt-14">
        <div className="sticky w-full max-w-[300px] top-10 left-0 hidden lg:inline-block ">
          <ClientProductsFilter searchParams={searchParams.brand} res={res} />
        </div>
        <div className="w-full">
          <div className="hidden lg:block w-full max-w-[1700px] mx-auto">
            <ClientSearchFilter />
          </div>
          <ProductsFeed />
        </div>
      </div>
      <Map />
      <Footer />
    </div>
  );
}

export default LaptopsPage;
