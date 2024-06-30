"use server";

import { ModalOrderData } from "@/hooks/use-filter-modal-store";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface getProductsProps {
  pageParam?: string;
  filterData?: ModalOrderData;
}

const ORDERS_BATCH = 8;

export const getOrders = async ({
  pageParam: cursor,
  filterData = {},
}: getProductsProps) => {
  let orders;

  if (cursor) {
    orders = await db.order.findMany({
      where: {
        status:
          filterData.status != "" && filterData.status != "all"
            ? //@ts-ignore
              OrderStatus[filterData.status]
            : undefined,

        createdAt: {
          gte: filterData.timeline?.from,
          lte: filterData.timeline?.to,
        },
        OR: [
          {
            name: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            products: {
              some: {
                name: {
                  contains: filterData.searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            wilaya: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            id: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
      take:
        filterData.searchTerm === "" &&
        filterData.status === "" &&
        !filterData.timeline?.from &&
        !filterData.timeline?.to
          ? ORDERS_BATCH
          : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
        timeline: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } else {
    orders = await db.order.findMany({
      where: {
        status:
          filterData.status != "" && filterData.status != "all"
            ? //@ts-ignore
              OrderStatus[filterData.status]
            : undefined,
        createdAt: {
          gte: filterData.timeline?.from,
          lte: filterData.timeline?.to,
        },
        OR: [
          {
            name: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            products: {
              some: {
                name: {
                  contains: filterData.searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            wilaya: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            id: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take:
        filterData.searchTerm === "" &&
        filterData.status === "" &&
        !filterData.timeline?.from &&
        !filterData.timeline?.to
          ? ORDERS_BATCH
          : undefined,
      include: {
        products: true,
        timeline: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  let nextCursor = null;
  if (orders.length === ORDERS_BATCH) {
    nextCursor = orders[orders.length - 1].id;
  }

  revalidatePath("/dashboard/orders");

  return {
    orders,
    nextCursor,
  };
};
