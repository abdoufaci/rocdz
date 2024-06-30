"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { useProductsQuery } from "@/hooks/use-query-products";
import { useClientProductsQuery } from "@/hooks/use-query-client-products";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Prisma } from "@prisma/client";

interface ClientSearchFilterProps {
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

function ClientSearchFilter({ res, searchParams }: ClientSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { onSearch, clientData } = useFilterModal();
  const { onOpen } = useModal();

  const { data: products } = useClientProductsQuery();

  useEffect(() => {
    onSearch(
      {},
      {},
      {},
      {
        brands: clientData?.brands || [],
        searchTerm: searchTerm,
      }
    );
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex items-center gap-3">
      <Input
        className="w-full border border-[#B3B3B3] rounded-[2px] lg:w-[50%] max-w-[424px] border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
        placeholder="Search for anything..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {(clientData?.brands?.length != 0 ||
        clientData?.searchTerm != "" ||
        (clientData.price?.max && clientData.price?.min)) &&
        !!products?.pages[0].products.length && (
          <h1 className="text-black font-semibold">
            {products?.pages[0].products.length} Result
          </h1>
        )}
      <Button
        onClick={() => onOpen("productsFilter", { res, searchParams })}
        className="bg-brand/90 hover:bg-brand text-black rounded-sm w-36 text-lg h-11 lg:hidden"
        type="button">
        Filter
      </Button>
    </div>
  );
}

export default ClientSearchFilter;
