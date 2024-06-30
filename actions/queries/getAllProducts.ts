"use server";

import { db } from "@/lib/db";

export const getAllProducts = async () => {
  const products = await db.product.findMany({
    where: {
      isSold: false,
    },
  });

  return products;
};
