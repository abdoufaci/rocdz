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

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { onSearch, productData } = useFilterModal();

  const { data: products } = useProductsQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      onSearch({
        searchTerm,
        brand: productData?.brand || "",
        status: productData?.status || "",
        price: productData?.price,
      });
    };
    fetchProducts();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex items-center gap-3">
      <Input
        className="w-full max-w-[380.52px] border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {(productData?.brand != "" ||
        productData?.searchTerm != "" ||
        productData?.status != "" ||
        (productData.price?.max && productData.price.min)) &&
        !!products?.pages[0].products.length && (
          <h1 className="text-black font-semibold">
            {products?.pages[0].products.length} Result
          </h1>
        )}
    </div>
  );
}

export default SearchFilter;
