"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ProductDetailsSchema } from "@/components/forms/product-details-form";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteFiles } from "../delete-file";

export const UpdateProduct = async (
  data: any,
  images?: Prisma.JsonValue,
  product_id?: string
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  if (data.images) {
    console.log({
      images,
    });
    //@ts-ignore
    deleteFiles(images);
  }

  let convertedData;

  if (data.isNew) {
    convertedData = {
      ...data,
      isNew: !!data.isNew.length,
    };
  } else {
    convertedData = data;
  }

  const product = await db.product.update({
    where: {
      id: product_id,
    },
    data: {
      ...convertedData,
    },
  });

  revalidatePath("/dashboard/products");

  return product;
};
