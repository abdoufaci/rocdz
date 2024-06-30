import { getMinMaxPrice } from "@/actions/queries/get-min-max-price";
import ClientBrandsFilter from "./brands-filter";
import { Prisma } from "@prisma/client";
import PriceFilter from "@/app/(main)/(admin)/dashboard/products/_components/price-filter";

interface ClientProductsFilterProps {
  res?: Prisma.GetProductAggregateType<{
    _max: {
      price: true;
    };
    _min: {
      price: true;
    };
  }>;
  searchParams?: string;
}

function ClientProductsFilter({
  res,
  searchParams,
}: ClientProductsFilterProps) {
  return (
    <div className="space-y-10 flex-grow">
      <ClientBrandsFilter searchParams={searchParams} />
      <PriceFilter res={res} />
    </div>
  );
}

export default ClientProductsFilter;
