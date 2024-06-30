"use client";

import { AddToCart } from "@/actions/mutations/cart-actions/add-to-cart";
import { UpdateCart } from "@/actions/mutations/cart-actions/update-cart";
import { Button } from "@/components/ui/button";
import { fetchCart } from "@/hooks/use-fetch-cart";
import { Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ShoppingCart, Truck } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product | null;
}

function ProductActions({ product }: ProductActionsProps) {
  const pathname = usePathname();

  const cartId = localStorage.getItem("cart_Id");
  const { refetch } = fetchCart();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      cartId ? UpdateCart({ product, cartId, pathname }) : add(),
    onMutate() {
      toast.loading("adding to cart...");
    },
    onSuccess(data) {
      if (data.cart) {
        refetch();
        toast.success("product added successfully !");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
    onError(error) {
      console.log({ error: error.message });
      toast.error("Something went wrong");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  const add = async () => {
    const data = await AddToCart({ product, pathname });

    localStorage.setItem("cart_Id", data.cart.id);
    return {
      ...data,
    };
  };

  return (
    <div className="flex flex-wrap items-center gap-3 ">
      {pathname != "/laptops" && pathname != "/" && (
        <Button
          className="rounded-none font-medium text-lg w-[336.65px] h-10 flex items-center gap-5"
          size={"xl"}
          variant={"brand"}>
          <Truck className="h-4 w-4 text-black" />
          Checkout
        </Button>
      )}
      <Button
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation();
          mutate();
        }}
        className="rounded-none font-medium text-lg w-[336.65px] h-10 flex items-center gap-5"
        size={"xl"}>
        <ShoppingCart className="h-4 w-4 text-white" />
        add to cart
      </Button>
    </div>
  );
}

export default ProductActions;
