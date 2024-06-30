"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import AddProductForm from "../forms/add-product-form";
import { ScrollArea } from "../ui/scroll-area";
import ProductDetailsForm from "../forms/product-details-form";

export const ProductDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "productDetails";

  const { product } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-full max-h-screen max-w-[1050px] ">
        <DialogHeader className="py-2 h-fit m-0">
          <DialogTitle className="text-xl text-left text-[#303030]">
            Product Details
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <ScrollArea className="h-[550px]">
          <ProductDetailsForm product={product} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
