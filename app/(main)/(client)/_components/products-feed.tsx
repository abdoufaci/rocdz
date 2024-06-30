"use client";

import { getProducts } from "@/actions/queries/getProducts";
import { useProductsQuery } from "@/hooks/use-query-products";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import NoResult from "@/components/no-result";
import ProductCard from "../../(admin)/dashboard/products/_components/product-card";
import { useClientProductsQuery } from "@/hooks/use-query-client-products";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function ProductsFeed() {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useClientProductsQuery();

  const [Buttonref, ButtonInView] = useInView();

  const { clientData } = useFilterModal();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-3 w-full max-w-[1700px] mx-auto mt-5 flex-grow">
      {(clientData?.searchTerm != "" || clientData?.brands?.length != 0) &&
      pathname === "/laptops" &&
      products?.pages[0].products.length === 0 ? (
        <NoResult />
      ) : isLoading ? (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            pathname === "/laptops"
              ? "min-[1800px]:grid-cols-4"
              : " xl:grid-cols-4"
          )}>
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            pathname === "/laptops"
              ? "min-[1800px]:grid-cols-4"
              : " xl:grid-cols-4"
          )}>
          {products?.pages.map((page) =>
            page?.products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCard={pathname === "/" || pathname === "/laptops"}
              />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center w-full">
          {isFetchingNextPage ? (
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4",
                pathname === "/laptops"
                  ? "min-[1800px]:grid-cols-4"
                  : " xl:grid-cols-4"
              )}>
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
            </div>
          ) : (
            pathname === "/laptops" && (
              <Button
                ref={Buttonref}
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}>
                Show more
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}

ProductsFeed.Skelton = function SkeltonProduct() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[285px] w-[285px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[125px]" />
      </div>
    </div>
  );
};

export default ProductsFeed;
