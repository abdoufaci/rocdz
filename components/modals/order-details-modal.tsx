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
import OrderDetailsForm from "../forms/order-details-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { useFilterModal } from "@/hooks/use-filter-modal-store";

export const OrderDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "orderDetails";

  const { onSearch, orderData } = useFilterModal();

  const { order } = data;

  const close = () => {
    onSearch(
      {
        searchTerm: "",
        status: "",
      },
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
      <DialogContent className="bg-white text-black w-full max-w-5xl">
        <OrderDetailsForm order={order} close={close} />
      </DialogContent>
    </Dialog>
  );
};
