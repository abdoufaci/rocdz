"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface SoldProductProps {
  product?: Product | null;
}

export const SoldProduct = async ({ product }: SoldProductProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const removedProduct = await db.product.update({
    where: {
      id: product?.id || "",
    },
    data: {
      isSold: !product?.isSold,
    },
  });

  revalidatePath("/dashboard/products");
  return removedProduct;
};
