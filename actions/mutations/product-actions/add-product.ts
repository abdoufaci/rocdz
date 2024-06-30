"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { AddProductSchema } from "@/components/forms/add-product-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddProduct = async (data: z.infer<typeof AddProductSchema>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const convertedData = {
    ...data,
    isNew: !!data.isNew?.length,
  };

  const product = await db.product.create({
    data: {
      ...convertedData,
      creatorId: currentUser?.id,
    },
  });

  revalidatePath("/dashboard/products");

  return product;
};
