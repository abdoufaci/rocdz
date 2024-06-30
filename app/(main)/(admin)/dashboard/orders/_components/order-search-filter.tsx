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
import { useOrdersQuery } from "@/hooks/use-query-orders";

function OrderSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { onSearch, orderData } = useFilterModal();

  const { data: orders } = useOrdersQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      onSearch(
        {},
        {
          searchTerm,
          status: orderData?.status || "",
          timeline: orderData?.timeline || {},
        }
      );
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
      {((orderData?.timeline?.from && orderData?.timeline.to) ||
        orderData?.searchTerm != "" ||
        orderData?.status != "") &&
        !!orders?.pages[0].orders.length && (
          <h1 className="text-black font-semibold">
            {orders?.pages[0].orders.length} Result
          </h1>
        )}
    </div>
  );
}

export default OrderSearchFilter;
