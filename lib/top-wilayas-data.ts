import { Order, Product } from "@prisma/client";

interface chartDataProps {
  orders?: (Order & {
    products?: Product[] | null;
  })[];
  topWilayas?: {
    wilaya: string;
  }[];
}

export const TopWilayaData = ({ orders, topWilayas }: chartDataProps) => {
  const data = topWilayas
    ?.map((topWilaya) => ({
      wilaya: topWilaya.wilaya,
      sales:
        orders?.filter((order) => order.wilaya === topWilaya.wilaya).length ||
        0,
    }))
    .sort((data1, data2) => (data1?.sales < data2?.sales ? 1 : 0))
    .slice(0, 10);

  return data;
};
