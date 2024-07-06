"use client";

import { ChevronDown, Ellipsis, ReceiptText, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product, OrderStatus as status } from "@prisma/client";
import { statuses } from "@/order-statuses";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateOrderStatus } from "@/actions/mutations/order-actions/update-status";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOrdersQuery } from "@/hooks/use-query-orders";

interface OrderStatusProps {
  orderStatus: status;
  orderId: string;
  products?: Product[] | null;
}

function OrderStatus({ orderStatus, orderId, products }: OrderStatusProps) {
  const { refetch } = useOrdersQuery();

  const { mutate } = useMutation({
    mutationFn: (status: status) =>
      UpdateOrderStatus(status, orderId, orderStatus, products),
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.order) {
        toast.success("order status updated !");
        refetch();
      }
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onMutate() {
      toast.loading("updating...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-within:ring-0 ring-0 border-none outline-none">
        <div
          className={cn(
            "p-2 rounded-md flex items-center gap-2 text-xs ",
            "",
            "",
            statuses[orderStatus].className
          )}>
          <h1 className="whitespace-nowrap">{statuses[orderStatus].title}</h1>
          <ChevronDown className=" h-3 w-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="focus-within:ring-0 space-y-1">
        {Object.entries(statuses)
          .filter((status) => status[0] != orderStatus)
          .map(([key, value]) => {
            return (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  mutate(value.key);
                }}
                key={key}
                className={cn(
                  "font-medium cursor-pointer",
                  value.key === status.CANCELED
                    ? "bg-[#ED2024]/15 focus-visible:bg-[#ED2024]/20 text-[#ED2024] focus-visible:text-[#ED2024]"
                    : value.key === status.CONFIRMED
                    ? "bg-[#69F1F1]/15 focus-visible:bg-[#69F1F1]/20 text-cyan"
                    : value.key === status.NOTCONFIRMED
                    ? "bg-[#7A7A7A]/15 focus-visible:bg-[#7A7A7A]/20 text-[#7A7A7A] focus-visible:text-[#7A7A7A]"
                    : value.key === status.SHIPPED
                    ? "bg-[#21D954]/15 focus-visible:bg-[#21D954]/20 text-[#239A3C] focus-visible:text-[#239A3C]"
                    : value.key === status.DELIVERING
                    ? "bg-[#1E78FF]/15 focus-visible:bg-[#1E78FF]/20 text-[#1E78FF] focus-visible:text-[#1E78FF]"
                    : value.key === status.RETURN
                    ? "bg-[#FCB707]/15 focus-visible:bg-[#FCB707]/20 text-warning focus-visible:text-warning"
                    : ""
                )}>
                {value.title}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderStatus;
