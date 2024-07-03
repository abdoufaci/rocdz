"use server";

import { db } from "@/lib/db";

export const getMinMaxPrice = async (isInLaptops?: boolean) => {
  const res = await db.product.aggregate({
    where: {
      isSold: isInLaptops ? false : undefined,
    },
    _max: {
      price: true,
    },
    _min: {
      price: true,
    },
  });

  return res;
};
