"use server";

import { db } from "@/lib/db";
import { statuses } from "@/order-statuses";
import { OrderStatus, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdateOrderStatus = async (
  status: OrderStatus,
  orderId: string,
  currentStatus: OrderStatus,
  products?: Product[] | null
) => {
  if (!products) {
    return;
  }
  if (currentStatus === "CANCELED") {
    const res = await db.$transaction(
      products.map((product) =>
        db.product.update({
          where: { id: product.id },
          data: { isSold: true },
        })
      )
    );
  }

  if (status === "CANCELED") {
    const res = await db.$transaction(
      products.map((product) =>
        db.product.update({
          where: { id: product.id },
          data: { isSold: false },
        })
      )
    );
  }

  const selectedStepTitle = statuses[status].stepTitle;

  const step = await db.step.create({
    data: {
      title: selectedStepTitle,
    },
  });

  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
      timeline: {
        connect: { id: step.id },
      },
    },
  });

  revalidatePath("/dashboard/orders");

  return order;
};
