"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ShortUniqueId from "short-unique-id";

export interface AddOrderProps {
  name: string;
  phone: string;
  wilaya: string;
  email: string;
  adress: string;
  details?: string | undefined;
  price: number;
  products: Product[];
}

export const AddOrder = async ({
  adress,
  email,
  name,
  phone,
  price,
  products,
  wilaya,
  details,
}: AddOrderProps) => {
  const currentUser = await getCurrentUser();

  const uid = new ShortUniqueId({ length: 10 });

  const orderId = uid.rnd();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const res = await db.$transaction(async (tx) => {
    const productsToUpdate = products?.filter((product) => product); // Filter out nullish values

    if (productsToUpdate?.length === 0) {
      return []; // Handle the case of no products to update
    }

    const updatePromises = products.map((product) =>
      tx.product.update({
        where: { id: product.id },
        data: { isSold: true },
      })
    );

    await Promise.all(updatePromises);
    // Optional: Return the original `res` if needed
  });

  const step = await db.step.create({
    data: {
      title: "Order Placed Online",
    },
  });

  const order = details
    ? await db.order.create({
        data: {
          id: orderId,
          email,
          name,
          phone,
          price,
          wilaya,
          adress,
          creatorId: currentUser.id,
          details,
          products: {
            connect: products.map((product) => ({ id: product.id })),
          },
          timeline: {
            connect: { id: step.id },
          },
        },
      })
    : await db.order.create({
        data: {
          id: orderId,
          email,
          name,
          phone,
          price,
          wilaya,
          adress,
          creatorId: currentUser.id,
          products: {
            connect: products.map((product) => ({ id: product.id })),
          },
          timeline: {
            connect: { id: step.id },
          },
        },
      });

  revalidatePath("/dashboard/orders");

  return order;
};
