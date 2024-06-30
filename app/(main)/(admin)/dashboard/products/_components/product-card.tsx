"use client";

import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import ProductCardOptions from "./product-card-options";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ProductActions = dynamic(
  () => import("@/app/(main)/(client)/_components/product-actions"),
  {
    ssr: false,
  }
);

interface ProductCardProps {
  product: Product | null;
  addToCard?: boolean;
}

function ProductCard({ product, addToCard }: ProductCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  let productImages = product?.images as Prisma.JsonArray;

  return (
    <div
      onClick={() =>
        pathname === "/dashboard/products" ? {} : router.push(`/${product?.id}`)
      }
      className={cn(
        "p-4 flex flex-col h-[500px] rounded-xl bg-white shadow-lg shadow-black/5 space-y-3",
        addToCard && "h-[550px] justify-between",
        pathname != "/dashboard/products" && "cursor-pointer"
      )}>
      <div className="relative w-full h-[285px]">
        <Image
          alt="laptop"
          src={
            //@ts-ignore
            productImages[0]?.url || ""
          }
          height={400}
          width={250}
          className="object-cover w-full h-full"
        />
        {product?.isSold && (
          <div className="h-full w-full bg-black/75 text-[#ED2024] text-5xl flex items-center justify-center absolute top-0 left-0 font-semibold">
            <h1>SOLD</h1>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-black flex items-center justify-between">
          <div className="text-[#383838] flex items-center gap-2 text-sm font-light">
            <h1 className="uppercase">{product?.brand}</h1>
            {product?.isNew && <span className="text-[#1CD6FF]">New</span>}
          </div>
          {!addToCard && <ProductCardOptions product={product} />}
        </div>
        <h1 className="font-semibold text-lg">{product?.name}</h1>
        <div className="text-[#434343] space-y-0.5 text-sm">
          <h1>{product?.cpu}</h1>
          <h1>
            {product?.ram}/{product?.storage}
          </h1>
          <h1>{product?.screen}</h1>
        </div>
        <h1 className="text-xl text-brand font-medium">{product?.price}DA</h1>
      </div>
      {addToCard && <ProductActions product={product} />}
    </div>
  );
}

export default ProductCard;
