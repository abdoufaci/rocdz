"use client";

import { fetchDashboardStates } from "@/hooks/use-fetch-dashboard-states";
import { DollarSign } from "lucide-react";
import Revenue from "./revenue";
import Orders from "./orders";
import TotalProducts from "./total-products";
import SoldProducts from "./sold-products";
import ReturnOrders from "./return-orders";
import ReturnLost from "./return-lost";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLastMonthDashboardStates } from "@/hooks/use-fetch-last-month-dashboard-states";
import { chartData } from "@/lib/chart-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Chart from "./chart";
import { TopWilayaData } from "@/lib/top-wilayas-data";
import { TopWilayas } from "./top-wilayas";

function DashboardStates() {
  const { data, isPending } = fetchDashboardStates();
  const { data: lastMonth, isPending: LastMonthPending } =
    fetchLastMonthDashboardStates();

  const orders = data?.chartOrders.filter(
    (order) => order.status === "SHIPPED"
  );

  const chart = chartData({ orders });

  const topWilayas = TopWilayaData({ orders, topWilayas: data?.groupedOrders });

  return (
    <>
      {!isPending && !LastMonthPending ? (
        <div className=" mx-auto max-w-[1700px] space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Revenue revenue={data?.revenue._sum.price} />
            <Orders
              orders={data?.orders.length}
              lastMonthOrders={lastMonth?.orders.length}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TotalProducts
              totalProducts={data?.totalProducts.length}
              LastMonthTotalProducts={lastMonth?.totalProducts.length}
            />
            <SoldProducts
              soldProducts={data?.soldProducts}
              LastMonthSoldProducts={lastMonth?.soldProducts}
            />
            <ReturnOrders
              returnOrders={data?.returnOrders.length}
              LastMonthReturnOrders={lastMonth?.returnOrders.length}
            />
            <ReturnLost
              returnLost={data?.returnLost}
              LastMonthReturnLost={lastMonth?.returnLost}
            />
          </div>
          <div className="w-full flex items-start max-md:flex-col gap-5">
            <Chart chart={chart} />
            <TopWilayas chartData={topWilayas} />
          </div>
        </div>
      ) : (
        <DashboardStates.Skelton />
      )}
    </>
  );
}

DashboardStates.Skelton = function DashboardStatesSkelton() {
  return (
    <div className="mx-auto max-w-[1700px] space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="w-full h-[150px] rounded-2xl" />
        <Skeleton className="w-full h-[150px] rounded-2xl" />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Skeleton className="w-full h-[120px] rounded-2xl" />
        <Skeleton className="w-full h-[120px] rounded-2xl" />
        <Skeleton className="w-full h-[120px] rounded-2xl" />
        <Skeleton className="w-full h-[120px] rounded-2xl" />
      </div>
      <div className="w-full flex items-center max-md:flex-col gap-5">
        <Skeleton className="rounded-2xl w-full h-[450px]" />
        <Skeleton className="rounded-2xl w-full max-w-[450px] h-[450px]" />
      </div>
      <div></div>
    </div>
  );
};

export default DashboardStates;
