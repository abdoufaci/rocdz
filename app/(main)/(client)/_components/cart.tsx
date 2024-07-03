"use client";

import { getCart } from "@/actions/queries/getCart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchCart } from "@/hooks/use-fetch-cart";
import { Cart as CartModel, Product } from "@prisma/client";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import CartProductCard from "./cart-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Cart() {
  const { data: cart, isPending, refetch } = fetchCart();

  const total = cart?.products.reduce((acc, product) => acc + product.price, 0);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="text-white/90 hover:text-white cursor-pointer flex items-center gap-3">
          <ShoppingBag className="h-5 w-5" />
          {cart?.products && cart?.products?.length > 0 && (
            <h1 className="text-sm">{cart?.products?.length}</h1>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 mt-3 mr-2 md:mr-10 w-full sm:w-[451.41px] rounded-none">
        <h1 className="text-xl font-semibold text-[#1D1D1F]">
          Your Shopping Cart
        </h1>
        <div className="w-full">
          {isPending ? (
            <Cart.Skelton />
          ) : !!cart?.products.length ? (
            <ScrollArea className="h-[200px]">
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
          ) : (
            <h1>cart empty.</h1>
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Sub-Total:</h1>
          <h1 className="text-[#1D1D1F] font-medium">{total} DA</h1>
        </div>
        {!!!cart?.products.length ? (
          <Button
            disabled={!!!cart?.products.length}
            variant={"brand"}
            className="w-full rounded-none disabled:bg-[#AEAEAE] mt-4">
            Checkout
          </Button>
        ) : (
          <Link href={"/checkout"}>
            <Button
              disabled={!!!cart?.products.length}
              variant={"brand"}
              className="w-full rounded-none disabled:bg-[#AEAEAE] mt-4">
              Checkout
            </Button>
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}

Cart.Skelton = function SkeltonCart() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Skeleton className="h-[154px] w-[148px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[125px]" />
        </div>
      </div>
      <Separator />
      <Skeleton className="h-[42.99px] w-full" />
    </div>
  );
};

export default Cart;
