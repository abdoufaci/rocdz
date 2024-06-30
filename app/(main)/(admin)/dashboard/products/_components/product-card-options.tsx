"use client";

import { Product } from "@prisma/client";
import { Ellipsis, ReceiptText, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProductCardOptionsProps {
  product: Product | null;
}

function ProductCardOptions({ product }: ProductCardOptionsProps) {
  const { onOpen } = useModal();

  return (
    <Popover>
      <PopoverTrigger asChild className="focus-within:ring-0 ring-0">
        <Ellipsis className="h-4 w-4 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="focus-within:ring-0 w-fit p-1">
        <div
          onClick={() => onOpen("soldProduct", { product })}
          className="flex items-center gap-2 text-black font-medium cursor-pointer p-1 rounded hover:bg-black/5 transition-all 
          duration-200 text-sm">
          <ShoppingBag className="h-4 w-4" />
          <h1>Make {product?.isSold ? "UnSold" : "Sold"} </h1>
        </div>
        <div
          onClick={() => onOpen("productDetails", { product })}
          className="flex items-center gap-2 text-black font-medium cursor-pointer p-1 rounded hover:bg-black/5 transition-all 
          duration-200 text-sm">
          <ReceiptText className="h-4 w-4" />
          <h1>View Details</h1>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProductCardOptions;
