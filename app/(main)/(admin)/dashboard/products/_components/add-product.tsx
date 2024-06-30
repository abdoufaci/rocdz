import Add from "@/components/add";

function AddProduct() {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-semibold">Products</h1>
      <Add type="addProduct" />
    </div>
  );
}

export default AddProduct;
