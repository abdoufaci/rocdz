import Add from "@/components/add";

async function AddOrders() {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-semibold">Orders</h1>
      <Add type="addOrder" />
    </div>
  );
}

export default AddOrders;
