"use client";

import { RemoveFromCart } from "@/actions/mutations/cart-actions/remove-from-cart";
import { fetchCart } from "@/hooks/use-fetch-cart";
import { Prisma, Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface CartProductCardProps {
  product: Product | null;
  cartId: string;
}

function CartProductCard({ product, cartId }: CartProductCardProps) {
  const productImages = product?.images as Prisma.JsonArray;

  const { refetch } = fetchCart();

  const { mutate } = useMutation({
    mutationFn: () => RemoveFromCart(cartId, product?.id ?? ""),
    onMutate() {
      toast.loading("removing product...");
    },
    onSuccess() {
      refetch();
      toast.success("product removed Succesfully");
    },
    onError() {
      toast.error("Something went wrong, try again .");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
        <div className="relative w-full max-w-[148px] min-w-[148px] h-[154px]">
          <Image
            alt="laptop"
            src={
              //@ts-ignore
              productImages[0]?.url ?? ""
            }
            height={154}
            width={148}
            className="object-cover w-full h-full"
          />
          {product?.isSold && (
            <div className="h-full w-full bg-black/75 text-[#ED2024] text-3xl flex items-center justify-center absolute top-0 left-0 font-semibold">
              <h1>SOLD</h1>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <h1 className="font-semibold">{product?.name}</h1>
          <div className="text-[#434343] space-y-1 text-[13px]">
            <h3>{product?.cpu}</h3>
            <h3>
              {product?.ram}/{product?.storage}{" "}
            </h3>
            <h3>{product?.screen}</h3>
          </div>
        </div>
      </div>
      <div onClick={() => mutate()} className="h-5 w-5">
        <XCircle className="!h-5 !w-5 text-black/35 hover:text-black/60 cursor-pointer transition-all duration-200 ease-out" />
      </div>
    </div>
  );
}

export default CartProductCard;
