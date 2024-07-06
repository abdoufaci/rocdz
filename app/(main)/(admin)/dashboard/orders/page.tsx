import { getAllProducts } from "@/actions/queries/getAllProducts";
import OrdersBar from "./_components/orders-bar";
import OrdersTable from "./_components/orders-table";

async function OrdersPage() {
  return (
    <div className="pb-10 w-full">
      <OrdersBar />
      <OrdersTable />
    </div>
  );
}

export default OrdersPage;
