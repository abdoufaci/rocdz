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

  const order = await db.order.create({
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
    },
  });

  return order;
};
