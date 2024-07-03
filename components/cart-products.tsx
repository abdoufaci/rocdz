"use client";

import Cart from "@/app/(main)/(client)/_components/cart";
import { fetchCart } from "@/hooks/use-fetch-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartProductCard from "@/app/(main)/(client)/_components/cart-product-card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Product, Cart as CartModel } from "@prisma/client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { HandCoins } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AddOrderFromCart } from "@/actions/mutations/order-actions/add-order-from-cart";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";

interface CartProductsProps {
  isPending: boolean;
  isMutationPending: boolean;
  cart:
    | (CartModel & {
        products: Product[] | null;
      })
    | null;
  total?: number;
}

function CartProducts({
  cart,
  isPending,
  total,
  isMutationPending,
}: CartProductsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { onOpen } = useModal();

  const { mutate, isPending: isAddingOrder } = useMutation({
    mutationFn: () => AddOrderFromCart({ cart }),
    onSuccess() {
      localStorage.removeItem("cart_Id");
      onOpen("thankyou");
    },
    onError() {
      toast.error("Something went wrong, try again .");
    },
  });

  return (
    <div className="w-full max-w-[580px] p-4 bg-white rounded-sm shadow-md">
      <div className="w-full">
        {isPending ? (
          <Cart.Skelton />
        ) : !!cart?.products?.length ? (
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-[#1D1D1F]">
              Your Shopping Cart
            </h1>
            <ScrollArea className="h-[180px]">
              <div className="space-y-5 w-full">
                {cart?.products?.map((product) => (
                  <CartProductCard
                    key={product.id}
                    product={product}
                    cartId={cart.id}
                  />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            {pathname === "/confirm" && cart?.price ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[#1D1D1F]">
                  <h1>Sub-Total:</h1>
                  <h1>{total} DA</h1>
                </div>
                <div className="flex items-center justify-between text-[#1D1D1F]">
                  <h1>Shipping:</h1>
                  <h1>{cart?.price - (total || 0)} DA</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <h1>Total:</h1>
                  <h1>{cart.price} DA</h1>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h1 className="font-semibold">Sub-Total:</h1>
                <h1 className="text-[#1D1D1F] font-medium">{total} DA</h1>
              </div>
            )}

            <Button
              disabled={
                !!!cart?.products.length ||
                isPending ||
                isMutationPending ||
                isAddingOrder
              }
              variant={"brand"}
              onClick={() => pathname === "/confirm" && mutate()}
              className={cn(
                "w-full rounded-none",
                !!!cart?.products.length && "bg-[#AEAEAE]"
              )}>
              Checkout
            </Button>
            <div className="flex justify-center items-center gap-2 text-[#1D1D1F] font-semibold text-sm">
              <HandCoins className="h-5 w-5" />
              <h1>Cash On Deliviry</h1>
            </div>
          </div>
        ) : (
          <h1>cart empty.</h1>
        )}
      </div>
    </div>
  );
}

export default CartProducts;
