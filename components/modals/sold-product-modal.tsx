"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SoldProduct } from "@/actions/mutations/product-actions/sold-product";
import { Prisma } from "@prisma/client";
import { useProductsQuery } from "@/hooks/use-query-products";

export const SoldProductModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { product } = data;
  const isModalOpen = isOpen && !!product && type === "soldProduct";

  const { refetch } = useProductsQuery();

  let productImages = product?.images as Prisma.JsonArray;

  const { mutate: removeProductMutation, isPending } = useMutation({
    mutationFn: () => SoldProduct({ product }),
    onSuccess(data) {
      refetch();
      toast.success(`${data.name} updated successfully`);
    },
    onError() {
      toast.error("Something went wrong");
    },
    onSettled() {
      onClose();
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2 flex flex-col items-center">
          <Image
            alt="laptop"
            src={
              //@ts-ignore
              productImages?.[0]?.url ?? ""
            }
            height={100}
            width={100}
            className="h-20 w-20 rounded-full object-cover"
          />
          <DialogTitle className="text-xl text-center font-medium">
            <h1 className="text-lg">
              Do want to make{" "}
              <span className="text-brand">{product?.name}</span>{" "}
              {product?.isSold ? "UnSold" : "Sold"} ?
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-5">
          <Button
            onClick={onClose}
            className="bg-transparent border border-black rounded-md text-black font-medium text-lg hover:bg-black hover:text-white"
            size={"xl"}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => removeProductMutation()}
            size={"xl"}
            variant={"brand"}
            className="font-medium text-lg">
            {product?.isSold ? "UNSOLD" : "SOLD"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
