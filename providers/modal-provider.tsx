"use client";

import { InviteModal } from "@/components/modals/InviteModal";
import { AddOrderModal } from "@/components/modals/add-order-modal";
import { AddProductModal } from "@/components/modals/add-product-modal";
import { OrderDetailsModal } from "@/components/modals/order-details-modal";
import { ProductDetailsModal } from "@/components/modals/product-details-modal";
import { ProductsFilterModal } from "@/components/modals/products-filter-modal";
import { SoldProductModal } from "@/components/modals/sold-product-modal";
import { ThankyouModal } from "@/components/modals/thankyou-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ProductDetailsModal />
      <InviteModal />
      <AddProductModal />
      <SoldProductModal />
      <AddOrderModal />
      <OrderDetailsModal />
      <ProductsFilterModal />
      <ThankyouModal />
    </div>
  );
};
