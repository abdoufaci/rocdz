import { getMinMaxPrice } from "@/actions/queries/get-min-max-price";
import ClientBrandsFilter from "./brands-filter";
import { Prisma } from "@prisma/client";
import PriceFilter from "@/app/(main)/(admin)/dashboard/products/_components/price-filter";

interface ClientProductsFilterProps {
  searchParams?: string;
}

function ClientProductsFilter({ searchParams }: ClientProductsFilterProps) {
  return (
    <div className="space-y-10 flex-grow">
      <ClientBrandsFilter searchParams={searchParams} />
      <PriceFilter />
    </div>
  );
}

export default ClientProductsFilter;
