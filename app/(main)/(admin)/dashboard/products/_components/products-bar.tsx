import AddProduct from "./add-product";
import BrandFilter from "./brand-filter";
import { PricePopover } from "./price-popover";
import SearchFilter from "./search-filter";
import StatusFilter from "./status-filter";

function ProductsBar() {
  return (
    <div className="w-full p-5 rounded-xl bg-white flex flex-wrap gap-5 items-center justify-between">
      <div className="flex items-center gap-7 flex-grow">
        <AddProduct />
        <SearchFilter />
      </div>
      <div className="flex items-center gap-2 w-full md:w-fit">
        <StatusFilter />
        <PricePopover />
        <BrandFilter />
      </div>
    </div>
  );
}

export default ProductsBar;
