import ProductsFeed from "./_components/products-feed";
import ProductsBar from "./_components/products-bar";

function ProductsPage() {
  return (
    <div className="space-y-5 pb-10">
      <ProductsBar />
      <ProductsFeed />
    </div>
  );
}

export default ProductsPage;
