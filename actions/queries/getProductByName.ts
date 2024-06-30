"use server";

import { db } from "@/lib/db";

export const getProductByName = async (name: string) => {
  const product = await db.product.findFirst({
    where: {
      name,
    },
  });

  return product;
};
