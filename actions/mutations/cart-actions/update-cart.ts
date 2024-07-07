"use server";

import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddToCartProps {
  product: Product | null;
  cartId: string;
  pathname: string;
}

export const UpdateCart = async ({
  product,
  cartId,
  pathname,
}: AddToCartProps) => {
  const Productexist = await db.cart.findFirst({
    where: {
      id: cartId,
      products: {
        some: {
          id: product?.id,
        },
      },
    },
  });

  if (Productexist) {
    return {
      cart: null,
      error: "product already in the cart",
    };
  }

  const cart = await db.cart.update({
    where: {
      id: cartId,
    },
    data: {
      products: {
        connect: { id: product?.id },
      },
    },
  });

  revalidatePath(pathname);

  return {
    cart: cart,
    error: null,
  };
};
