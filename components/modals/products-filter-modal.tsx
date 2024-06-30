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
import ClientProductsFilter from "@/app/(main)/(client)/laptops/_components/brands-filter";
import PriceFilter from "@/app/(main)/(admin)/dashboard/products/_components/price-filter";

export const ProductsFilterModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "productsFilter";

  const { res, searchParams } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black ">
        <div className="relative w-full space-y-10">
          <ClientProductsFilter searchParams={searchParams} />
          <PriceFilter res={res} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
