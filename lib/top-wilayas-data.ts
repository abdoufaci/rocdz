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
  var date = new Date();
  var thisMonthfirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var thisMonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const convertedOrders = orders?.filter(
    (order) =>
      order.createdAt >= thisMonthfirstDay &&
      order.createdAt <= thisMonthlastDay
  );

  const data = topWilayas
    ?.map((topWilaya) => ({
      wilaya: topWilaya.wilaya,
      sales:
        convertedOrders?.filter((order) => order.wilaya === topWilaya.wilaya)
          .length || 0,
    }))
    .sort((data1, data2) => data2.sales - data1.sales)
    .slice(0, 10);

  return data;
};
