"use server";

import {
  ModalClientdData,
  ModalProductData,
} from "@/hooks/use-filter-modal-store";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface getProductsProps {
  pageParam?: string;
  filterData?: ModalClientdData;
}

const PRODUCTS_BATCH = 12;

export const getClientProducts = async ({
  pageParam: cursor,
  filterData = {},
}: getProductsProps) => {
  let products: Product[];

  if (cursor) {
    products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: filterData.searchTerm ? filterData.searchTerm : "",
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: filterData.searchTerm ? filterData.searchTerm : "",
              mode: "insensitive",
            },
          },
        ],
        price: {
          gte: filterData.price?.max ? filterData.price.min : undefined,
          lte: filterData.price?.min ? filterData.price.max : undefined,
        },
        brand: {
          in: filterData.brands?.length != 0 ? filterData.brands : undefined,
        },
        isSold: false,
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
      take:
        filterData.searchTerm === "" && filterData.brands?.length === 0
          ? PRODUCTS_BATCH
          : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: filterData.searchTerm ? filterData.searchTerm : "",
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: filterData.searchTerm ? filterData.searchTerm : "",
              mode: "insensitive",
            },
          },
        ],
        price: {
          gte: filterData.price?.max ? filterData.price.min : undefined,
          lte: filterData.price?.min ? filterData.price.max : undefined,
        },
        brand: {
          in: filterData.brands?.length != 0 ? filterData.brands : undefined,
        },
        isSold: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take:
        filterData.searchTerm === "" && filterData.brands?.length === 0
          ? PRODUCTS_BATCH
          : undefined,
    });
  }

  let nextCursor = null;
  if (products.length === PRODUCTS_BATCH) {
    nextCursor = products[products.length - 1].id;
  }

  revalidatePath("/");

  return {
    products,
    nextCursor,
  };
};
