import { db } from "@/lib/db";

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};
