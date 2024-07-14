import ProductsFeed from "./_components/products-feed";
import ProductsBar from "./_components/products-bar";
import { Analytics } from "@vercel/analytics/react";

function ProductsPage() {
  return (
    <div className="space-y-5 pb-10">
      <ProductsBar />
      <ProductsFeed />
      <Analytics />
    </div>
  );
}

export default ProductsPage;
