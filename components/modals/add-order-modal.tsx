"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import AddOrderForm from "../forms/add-order-form";
import { useFilterModal } from "@/hooks/use-filter-modal-store";

export const AddOrderModal = () => {
  const { isOpen, onClose, type } = useModal();

  const { onSearch, orderData } = useFilterModal();

  const isModalOpen = isOpen && type === "addOrder";

  const close = () => {
    onSearch(
      {},
      {
        searchTerm: orderData?.searchTerm,
        status: orderData?.status,
        timeline: orderData?.timeline,
      }
    );
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent className="bg-white text-black w-full max-w-[650px] ">
        <DialogHeader className="py-2 h-fit m-0">
          <DialogTitle className="text-xl text-[#303030] text-left">
            Add Order
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <ScrollArea className="h-[550px]">
          <AddOrderForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
