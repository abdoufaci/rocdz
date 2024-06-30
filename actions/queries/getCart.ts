"use server";

import { db } from "@/lib/db";

export const getCart = async (cartId: string, checkout?: boolean) => {
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      products: {
        where: {
          isSold: false,
        },
      },
    },
  });

  return cart;
};
