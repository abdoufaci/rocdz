import { db } from "@/lib/db";

export const getMinMaxPrice = async () => {
  const res = await db.product.aggregate({
    _max: {
      price: true,
    },
    _min: {
      price: true,
    },
  });

  return res;
};
