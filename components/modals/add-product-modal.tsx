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

export const AddProductModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addProduct";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-full max-w-[1050px] ">
        <DialogHeader className="py-2 h-fit m-0">
          <DialogTitle className="text-xl text-[#303030]">
            Add Product
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <ScrollArea className="h-[550px]">
          <AddProductForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
