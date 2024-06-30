"use server";

import { db } from "@/lib/db";

interface AddClientDetailsProps {
  name: string;
  phone: string;
  wilaya: string;
  email: string;
  adress: string;
  details?: string | undefined;
  price: number;
}

export const AddClientDetails = async (
  data: AddClientDetailsProps,
  cart_Id?: string
) => {
  if (!data.details && data.details != "") {
    delete data.details;
  }

  const cart = await db.cart.update({
    where: {
      id: cart_Id || "",
    },
    data: {
      ...data,
    },
  });

  return cart;
};
