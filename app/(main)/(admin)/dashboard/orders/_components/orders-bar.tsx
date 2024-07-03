import AddOrders from "./add-orders";
import DateFilter from "./date-filter";
import OrderSearchFilter from "./order-search-filter";
import OrderStatusFilter from "./order-status-filter";

function OrdersBar() {
  return (
    <div className="w-full p-5 rounded-b-none rounded-xl bg-white flex flex-wrap gap-5 items-center justify-between">
      <div className="flex items-center gap-7 flex-grow">
        <AddOrders />
        <OrderSearchFilter />
      </div>
      <div className="flex flex-wrap items-center gap-5 w-full md:w-fit">
        <DateFilter />
        <OrderStatusFilter />
      </div>
    </div>
  );
}

export default OrdersBar;
