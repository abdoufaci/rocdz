"use client";

import { getProducts } from "@/actions/queries/getProducts";
import ProductCard from "./product-card";
import { useProductsQuery } from "@/hooks/use-query-products";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import NoResult from "@/components/no-result";

function ProductsFeed() {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProductsQuery();

  const [Buttonref, ButtonInView] = useInView();

  const { productData } = useFilterModal();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  return (
    <div className="flex flex-col space-y-3 w-full max-w-[1700px] mx-auto">
      {(productData?.searchTerm != "" ||
        productData?.status != "" ||
        productData?.brand != "") &&
      products?.pages[0].products.length === 0 ? (
        <NoResult />
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
          <ProductsFeed.Skelton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.pages.map((page) =>
            page?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center w-full">
          {isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ">
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
              <ProductsFeed.Skelton />
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
