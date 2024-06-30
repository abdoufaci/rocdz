"use server";

import { ModalProductData } from "@/hooks/use-filter-modal-store";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface getProductsProps {
  pageParam?: string;
  filterData?: ModalProductData;
}

const PRODUCTS_BATCH = 12;

export const getProducts = async ({
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
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
        price: {
          gte: filterData.price?.max ? filterData.price.min : undefined,
          lte: filterData.price?.min ? filterData.price.max : undefined,
        },
        isSold:
          filterData.status === "available"
            ? false
            : filterData.status === "sold"
            ? true
            : undefined,
        brand: filterData.brand ? filterData.brand : undefined,
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
      take:
        filterData.searchTerm === "" &&
        filterData.brand === "" &&
        filterData.status === "" &&
        !filterData?.price?.max &&
        !filterData?.price?.min
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
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
        price: {
          gte: filterData.price?.max ? filterData.price.min : undefined,
          lte: filterData.price?.min ? filterData.price.max : undefined,
        },
        isSold:
          filterData.status === "available"
            ? false
            : filterData.status === "sold"
            ? true
            : undefined,
        brand:
          filterData.brand && filterData.brand != "all"
            ? filterData.brand
            : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      take:
        filterData.searchTerm === "" &&
        filterData.brand === "" &&
        filterData.status === ""
          ? PRODUCTS_BATCH
          : undefined,
    });
  }

  let nextCursor = null;
  if (products.length === PRODUCTS_BATCH) {
    nextCursor = products[products.length - 1].id;
  }

  revalidatePath("/dashboard/products");

  return {
    products,
    nextCursor,
  };
};
