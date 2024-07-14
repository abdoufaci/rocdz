import { getAllProducts } from "@/actions/queries/getAllProducts";
import { getCart } from "@/actions/queries/getCart";
import { useQuery } from "@tanstack/react-query";

export const fetchAllProducts = () => {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => getAllProducts(),
    queryKey: ["clientproducts"],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
