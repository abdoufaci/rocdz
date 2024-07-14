import { getCart } from "@/actions/queries/getCart";
import { useQuery } from "@tanstack/react-query";

export const fetchCart = () => {
  const cartId = localStorage.getItem("cart_Id") ?? "";

  const { data, isPending, refetch } = useQuery({
    queryFn: () => getCart(cartId),
    queryKey: ["cart", cartId],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
