"use server";

import { db } from "@/lib/db";
import { Cart, Product } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

interface AddOrderFromCartProps {
  cart:
    | (Cart & {
        products: Product[] | null;
      })
    | null;
}

export const AddOrderFromCart = async ({ cart }: AddOrderFromCartProps) => {
  const uid = new ShortUniqueId({ length: 10 });

  const orderId = uid.rnd();

  const step = await db.step.create({
    data: {
      title: "Order Placed Online",
    },
  });

  const res = await db.$transaction([
    ...(cart?.products || []).map((product) =>
      db.product.update({
        where: { id: product.id },
        data: { isSold: true },
      })
    ),
    db.order.create({
      data: {
        id: orderId,
        products: {
          connect: cart?.products?.map((product) => ({ id: product.id })),
        },
        email: cart?.email ?? "",
        name: cart?.name ?? "",
        details: cart?.details,
        phone: cart?.phone ?? "",
        price: cart?.price ?? 0,
        wilaya: cart?.wilaya ?? "",
        adress: cart?.adress,
        timeline: {
          connect: { id: step.id },
        },
      },
    }),
    db.cart.delete({
      where: {
        id: cart?.id,
      },
    }),
  ]);

  return res[1];
};
