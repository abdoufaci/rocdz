import { getProducts } from "@/actions/queries/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getClientProducts } from "@/actions/queries/get-client-products";

export const useClientProductsQuery = () => {
  const { clientData: filterData } = useFilterModal();

  const fetchProducts = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const products = await getClientProducts({
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
    queryKey: ["clientproducts", filterData],
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
