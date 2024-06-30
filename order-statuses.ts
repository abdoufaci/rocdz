import { OrderStatus } from "@prisma/client";

export const statuses = {
  SHIPPED: {
    className:
      "bg-[#21D954]/15 focus-visible:bg-[#21D954]/20 text-[#239A3C] focus-visible:text-[#239A3C]",
    title: "Shipped",
    color: "text-[#239A3C]",
    key: OrderStatus.SHIPPED,
    stepTitle: "Arrived to the client",
  },
  CANCELED: {
    className:
      "bg-[#ED2024]/15 focus-visible:bg-[#ED2024]/20 text-[#ED2024] focus-visible:text-[#ED2024] ",
    title: "Canceled",
    color: "text-[#ED2024]",
    key: OrderStatus.CANCELED,
    stepTitle: "Order Canceled By client",
  },
  DELIVERING: {
    className:
      "bg-[#1E78FF]/15 focus-visible:bg-[#1E78FF]/20 text-[#1E78FF] focus-visible:text-[#1E78FF]",
    title: "Delivering",
    color: "text-[#1E78FF]",
    key: OrderStatus.DELIVERING,
    stepTitle: "Start Shipping ",
  },
  NOTCONFIRMED: {
    className:
      "bg-[#7A7A7A]/15 focus-visible:bg-[#7A7A7A]/20 text-[#7A7A7A] focus-visible:text-[#7A7A7A]",
    title: "Not Confirmed",
    color: "text-[#7A7A7A]",
    key: OrderStatus.NOTCONFIRMED,
    stepTitle: "Order Placed Online",
  },
  CONFIRMED: {
    className: "bg-[#69F1F1]/15 focus-visible:bg-[#69F1F1]/20 text-cyan",
    title: "Confirmed",
    color: "text-cyan",
    key: OrderStatus.CONFIRMED,
    stepTitle: "Order Confirmed By client",
  },
};

/*
<DropdownMenuItem
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
                    : ""
                )}>
                {value.title}
              </DropdownMenuItem>
*/
