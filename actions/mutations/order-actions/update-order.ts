"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ProductDetailsSchema } from "@/components/forms/product-details-form";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const UpdateOrder = async (
  data: {
    products?: Product[];
    name?: string;
    phone?: string;
    wilaya?: string;
    email?: string;
    adress?: string;
    details?: string;
    price?: number;
  },
  currentProducts?: Product[] | null,
  orderId?: string
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  let products: string[] | undefined;

  let productsToMakeUnsold: string[] | undefined;

  const step = await db.step.create({
    data: {
      title: "order updated",
    },
  });

  if (!data.products) {
    const order = await db.order.update({
      where: {
        id: orderId ?? "",
      },
      //@ts-ignore
      data: {
        ...data,
        timeline: {
          connect: { id: step.id },
        },
      },
    });

    revalidatePath("/dashboard/orders");
    return order;
  }

  const productsIds = data.products?.map((product) => product.id);
  const currentProductsIds = currentProducts?.map((product) => product.id);

  products = productsIds?.filter(
    (product) => !currentProductsIds?.includes(product)
  );

  productsToMakeUnsold = currentProductsIds?.filter(
    (product) => !productsIds?.includes(product)
  );

  delete data.products;

  const res = await db.$transaction([
    ...(productsToMakeUnsold || []).map((productId) =>
      db.product.update({
        where: { id: productId },
        data: { isSold: false },
      })
    ),
    ...(products || []).map((productId) =>
      db.product.update({
        where: { id: productId },
        data: { isSold: true },
      })
    ),
    db.order.update({
      where: {
        id: orderId ?? "",
      },
      data: {
        //@ts-ignore
        ...data,
        products: {
          connect: products?.map((product) => ({ id: product })),
          disconnect: productsToMakeUnsold?.map((product) => ({ id: product })),
        },
        timeline: {
          connect: { id: step.id },
        },
      },
    }),
  ]);

  revalidatePath("/dashboard/orders");

  return res[2];
};
