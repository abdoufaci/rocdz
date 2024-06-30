import { getProducts } from "@/actions/queries/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getOrders } from "@/actions/queries/getOrders";

export const useOrdersQuery = () => {
  const { orderData: filterData } = useFilterModal();

  const fetchOrders = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const orders = await getOrders({
      pageParam,
      filterData,
    });

    return orders;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["orders", filterData],
    queryFn: fetchOrders,
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
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
  };
};
