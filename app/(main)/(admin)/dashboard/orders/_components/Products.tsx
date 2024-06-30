"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Prisma, Product, User } from "@prisma/client";
import Image from "next/image";
import { CircleMinus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductsQuery } from "@/hooks/use-query-products";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { Separator } from "@/components/ui/separator";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import NoResult from "@/components/no-result";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ProductsProps {
  isModalOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<
    {
      name: string;
      products: [any, ...any[]];
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
    },
    any,
    undefined
  >;
  field: ControllerRenderProps<
    {
      name: string;
      products: [any, ...any[]];
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
    },
    "products"
  >;
}

export const Products = ({
  isModalOpen,
  onClose,
  form,
  field,
}: ProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: products,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProductsQuery();

  const { onSearch, productData, orderData } = useFilterModal();

  console.log({
    productData,
  });

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  useEffect(() => {
    onSearch(
      { searchTerm: debouncedSearchTerm, status: "available" },
      {
        searchTerm: orderData?.searchTerm,
        status: orderData?.status,
        timeline: orderData?.timeline,
      }
    );
  }, [debouncedSearchTerm]);

  const closeAndClear = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeAndClear}>
      <DialogContent className="bg-white text-black max-w-4xl  ">
        <DialogHeader className="">
          <DialogTitle className="text-xl text-left font-bold">
            Products
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <Input
          className="w-full border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col space-y-3 w-full">
            {productData?.searchTerm != "" &&
            products?.pages[0].products.length === 0 ? (
              <NoResult />
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Products.Skelton />
                <Products.Skelton />
                <Products.Skelton />
                <Products.Skelton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products?.pages.map((page) =>
                  page?.products.map((product, idx) => {
                    const productImages = product?.images as Prisma.JsonArray;

                    const isIncluded = field.value.filter(
                      (fieldProduct) => product.id === fieldProduct.id
                    );
                    return (
                      <div
                        key={idx}
                        onClick={() =>
                          !!isIncluded.length
                            ? field.onChange(
                                field.value.filter(
                                  (fieldProduct) =>
                                    product.id != fieldProduct.id
                                )
                              )
                            : field.onChange([...field.value, product])
                        }
                        className={cn(
                          "flex items-center justify-between rounded-3xl border-2  p-2 cursor-pointer",
                          !!isIncluded.length
                            ? "border-brand"
                            : "border-[#E4E4E4]"
                        )}>
                        <div className="flex items-center gap-4">
                          <div className="relative w-full max-w-[148px] min-w-[148px] h-[154px]">
                            <Image
                              alt="laptop"
                              src={
                                //@ts-ignore
                                productImages[0]?.url ?? ""
                              }
                              height={154}
                              width={148}
                              className="object-cover w-full h-full rounded-3xl"
                            />
                            {product?.isSold && (
                              <div className="h-full w-full bg-black/75 text-[#ED2024] text-3xl flex items-center justify-center absolute top-0 left-0 font-semibold">
                                <h1>SOLD</h1>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <h1 className="font-semibold">{product?.name}</h1>
                            <div className="text-[#434343] space-y-1 text-[13px]">
                              <h3>{product?.cpu}</h3>
                              <h3>
                                {product?.ram}/{product?.storage}{" "}
                              </h3>
                              <h3>{product?.screen}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
            {hasNextPage && (
              <div className="flex justify-center w-full">
                {isFetchingNextPage ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
                    <Products.Skelton />
                    <Products.Skelton />
                    <Products.Skelton />
                    <Products.Skelton />
                    <Products.Skelton />
                  </div>
                ) : (
                  <Button
                    ref={Buttonref}
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}>
                    Show more
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

Products.Skelton = function SkeltonProduct() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-[148px] h-[154px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[125px]" />
      </div>
    </div>
  );
};
