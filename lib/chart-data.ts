import { Order, Product } from "@prisma/client";

interface chartDataProps {
  orders?: (Order & {
    products?: Product[] | null;
  })[];
}

export const chartData = ({ orders }: chartDataProps) => {
  const data = [
    {
      month: "Jan",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jan"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Feb",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Feb"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Mar",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Mar"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Apr",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Apr"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "May",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "May"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Jun",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jun"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Jul",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jul"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Aug",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Aug"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Sept",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Sept"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Oct",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Oct"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Nov",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Nov"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
    {
      month: "Dec",
      sales: orders
        ?.filter(
          (order) =>
            order.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Dec"
        )
        .reduce((acc, order) => acc + order.price, 0),
    },
  ];

  return data;
};
