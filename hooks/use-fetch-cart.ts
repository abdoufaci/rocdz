import { getCart } from "@/actions/queries/getCart";
import { useQuery } from "@tanstack/react-query";

export const fetchCart = (checkout?: boolean) => {
  const cartId = localStorage.getItem("cart_Id") ?? "";

  const { data, isPending, refetch } = useQuery({
    queryFn: () => getCart(cartId, checkout),
    queryKey: ["cart"],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
