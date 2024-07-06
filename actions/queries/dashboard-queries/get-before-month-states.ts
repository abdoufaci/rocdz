"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

interface getBeforeMonthStatesProps {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export const getBeforeMonthStates = async ({
  timeline,
}: getBeforeMonthStatesProps) => {
  if (!timeline?.from) {
    return;
  }

  const to = new Date(timeline.from);

  let fromBefore = new Date(timeline.from);

  fromBefore.setMonth(fromBefore.getMonth() - 1);

  const orders = await db.order.findMany({
    where: {
      status: {
        notIn: [
          OrderStatus.CANCELED,
          OrderStatus.RETURN,
          OrderStatus.NOTCONFIRMED,
        ],
      },
      createdAt: {
        gte: fromBefore,
        lte: to,
      },
    },
    include: {
      products: true,
    },
  });

  const totalProducts = await db.product.findMany({
    where: {
      createdAt: {
        gte: fromBefore,
        lte: to,
      },
    },
  });

  const soldProducts = orders.reduce(
    (acc, order) => acc + order.products.length,
    0
  );

  const returnOrders = await db.order.findMany({
    where: {
      status: OrderStatus.RETURN,
      createdAt: {
        gte: fromBefore,
        lte: to,
      },
    },
  });

  const returnLost = returnOrders.length * 500;

  return {
    returnLost,
    orders,
    soldProducts,
    totalProducts,
    returnOrders,
  };
};
