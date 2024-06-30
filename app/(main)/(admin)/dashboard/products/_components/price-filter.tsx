"use client";

import { Slider } from "@/components/ui/slider";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { Prisma } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PriceFilterProps {
  res?: Prisma.GetProductAggregateType<{
    _max: {
      price: true;
    };
    _min: {
      price: true;
    };
  }>;
}

function PriceFilter({ res }: PriceFilterProps) {
  const pathname = usePathname();

  const { onSearch, productData, clientData } = useFilterModal();

  const [MinValue, setMinValue] = useState<number>(
    (pathname === "/laptops"
      ? clientData?.price?.min
      : pathname === "/dashboard/products" && productData?.price?.min) ||
      res?._min.price ||
      0
  );
  const [MaxValue, setMaxValue] = useState<number>(
    (pathname === "/laptops"
      ? clientData?.price?.max
      : pathname === "/dashboard/products" && productData?.price?.max) ||
      res?._max.price ||
      10000
  );

  return (
    <div className="w-full space-y-3">
      <Slider
        defaultValue={[res?._min.price || 0, res?._max.price || 10000]}
        onValueChange={(range) => {
          const [min, max] = range;

          setTimeout(() => {
            pathname === "/dashboard/products"
              ? onSearch(
                  {
                    brand: productData?.brand || "",
                    searchTerm: productData?.searchTerm || "",
                    status: productData?.status || "",
                    price: {
                      max,
                      min,
                    },
                  },
                  {},
                  {},
                  {}
                )
              : pathname === "/laptops" &&
                onSearch(
                  {},
                  {},
                  {},
                  {
                    brands: clientData.brands,
                    searchTerm: clientData.searchTerm,
                    price: {
                      min: min,
                      max: max,
                    },
                  }
                );
          }, 300);
          setMinValue(min);
          setMaxValue(max);
        }}
        value={[MinValue, MaxValue]}
        min={res?._min.price || 0}
        max={res?._max.price || 10000}
        step={500}
      />
      <div className="flex items-center gap-3">
        <div className="border border-[#B9B9B9] rounded-[3px] text-[#444444] h-9 flex items-center justify-center w-full max-w-72">
          {MinValue} DA
        </div>
        <div className="border border-[#B9B9B9] rounded-[3px] text-[#444444] h-9 flex items-center justify-center w-full max-w-72">
          {MaxValue} DA
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
