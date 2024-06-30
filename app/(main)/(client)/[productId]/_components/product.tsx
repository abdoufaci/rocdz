import { Product as ProductModel } from "@prisma/client";
import ImageCarousel from "./image-carousel";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Handshake,
  Headphones,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProductActions = dynamic(
  () => import("@/app/(main)/(client)/_components/product-actions"),
  {
    ssr: false,
  }
);

interface ProductProps {
  product: ProductModel | null;
}

function Product({ product }: ProductProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-5">
        <Link href={"/laptops"}>
          <ArrowLeft className="h-7 w-7 text-[#3F3F3F] cursor-pointer" />
        </Link>
        <div className="text-[#3F3F3F] text-xs flex items-center">
          <h1>Home / Laptops / </h1>{" "}
          <span className="text-black font-semibold"> {product?.name}</span>{" "}
        </div>
      </div>
      <div className="flex max-lg:flex-col flex-row gap-24 justify-center items-start w-full">
        <ImageCarousel images={product?.images} />
        <div className="space-y-10">
          <div className="space-y-3.5">
            <h1 className="text-[#5F6C72] font-medium text-xs">
              Availability:{" "}
              <span
                className={cn(
                  "font-semibold",
                  product?.isSold ? "text-error" : "text-success"
                )}>
                {" "}
                {product?.isSold ? "Sold" : "In Stock"}
              </span>
            </h1>
            <h1 className="text-[#191C1F] text-xl font-black">
              {product?.name}
            </h1>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Brand: </span>
                <h1>{product?.name}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">CPU: </span>
                <h1>{product?.cpu}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">RAM: </span>
                <h1>{product?.ram}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Storage: </span>
                <h1>{product?.storage}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Screen: </span>
                <h1>{product?.screen}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Battery: </span>
                <h1>{product?.battery}</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Stat: </span>
                <h1>{product?.battery}/10</h1>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <span className="text-[#5F6C72] font-medium">Details: </span>
                <h1>{product?.details}</h1>
              </div>
            </div>
            <Separator />
            <ProductActions product={product} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#191C1F] text-sm">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <h1>Free 1 Year Warranty</h1>
            </div>
            <div className="flex items-center gap-3 text-[#191C1F] text-sm">
              <Truck className="h-5 w-5 text-brand" />
              <h1>Fast Delivery to 58 Wilaya</h1>
            </div>
            <div className="flex items-center gap-3 text-[#191C1F] text-sm">
              <Handshake className="h-5 w-5 text-brand" />
              <h1>100% Money-back guarantee</h1>
            </div>
            <div className="flex items-center gap-3 text-[#191C1F] text-sm">
              <Headphones className="h-5 w-5 text-brand" />
              <h1>24/7 Customer support</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
