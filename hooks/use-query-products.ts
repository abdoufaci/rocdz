import { getProducts } from "@/actions/queries/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";

export const useProductsQuery = () => {
  const { productData: filterData } = useFilterModal();

  const fetchProducts = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const products = await getProducts({
      pageParam,
      filterData,
    });

    return products;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products", filterData],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    refetchInterval: false,
  });

  return {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  };
};
