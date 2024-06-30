"use server";

import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddToCartProps {
  product: Product | null;
  pathname: string;
}

export const AddToCart = async ({ product, pathname }: AddToCartProps) => {
  const cart = await db.cart.create({
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
