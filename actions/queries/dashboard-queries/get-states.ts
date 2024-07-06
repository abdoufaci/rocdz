"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

interface getStatesProps {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export const getDashboardStates = async ({ timeline }: getStatesProps) => {
  if (!timeline) {
    return;
  }

  var date = new Date();
  var thisMonthfirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var thisMonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const currentYear = new Date().getFullYear();

  // Get the first day of the year
  const firstDay = new Date(currentYear, 0, 1); // January 1st

  // Get the last day of the year
  const lastDay = new Date(currentYear, 11, 31);

  const revenue = await db.order.aggregate({
    where: {
      status: OrderStatus.SHIPPED,
    },
    _sum: {
      price: true,
    },
  });

  const groupedOrders = await db.order.groupBy({
    by: ["wilaya"],
    where: {
      status: "SHIPPED",
      createdAt: {
        gte: thisMonthfirstDay,
        lte: thisMonthlastDay,
      },
    },
  });

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
        gte: timeline?.from,
        lte: timeline?.to,
      },
    },
    include: {
      products: true,
    },
  });

  const chartOrders = await db.order.findMany({
    where: {
      status: OrderStatus.SHIPPED,
      createdAt: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });

  const totalProducts = await db.product.findMany({
    where: {
      createdAt: {
        gte: timeline?.from,
        lte: timeline?.to,
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
        gte: timeline?.from,
        lte: timeline?.to,
      },
    },
  });

  const returnLost = returnOrders.length * 500;

  return {
    returnLost,
    orders,
    soldProducts,
    totalProducts,
    revenue,
    returnOrders,
    chartOrders,
    groupedOrders,
  };
};
