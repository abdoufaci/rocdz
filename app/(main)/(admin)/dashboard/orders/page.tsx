import { getAllProducts } from "@/actions/queries/getAllProducts";
import OrdersBar from "./_components/orders-bar";
import OrdersTable from "./_components/orders-table";

async function OrdersPage() {
  const products = await getAllProducts();
  return (
    <div className="pb-10 w-full">
      <OrdersBar />
      <OrdersTable products={products} />
    </div>
  );
}

export default OrdersPage;
