import DashboardStates from "./_components/dashboard-states";
import OrdersBar from "./orders/_components/orders-bar";
import OrdersTable from "./orders/_components/orders-table";
import { Analytics } from "@vercel/analytics/react";

function DashboardPage() {
  return (
    <div className="w-full space-y-10">
      <DashboardStates />
      <div className="pb-10 w-full max-w-[1700px] mx-auto">
        <OrdersBar />
        <OrdersTable />
      </div>
      <Analytics />
    </div>
  );
}

export default DashboardPage;
