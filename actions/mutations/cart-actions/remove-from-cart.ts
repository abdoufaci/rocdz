"use server";

import { db } from "@/lib/db";

export const RemoveFromCart = async (id: string, productId: string) => {
  const cart = await db.cart.update({
    where: {
      id,
    },
    data: {
      products: {
        disconnect: { id: productId },
      },
    },
  });

  return cart;
};
