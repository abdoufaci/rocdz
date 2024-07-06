import { PersentageCalculation } from "@/lib/PersentageCalculation";
import PercentageBadge from "./percentage-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrdersProps {
  soldProducts?: number;
  LastMonthSoldProducts?: number;
}

function SoldProducts({ soldProducts, LastMonthSoldProducts }: OrdersProps) {
  const percentage = PersentageCalculation({
    lastMonth: LastMonthSoldProducts,
    thisMonth: soldProducts,
  });

  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#191919]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#686868] text-xs font-medium">Sold Products</h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-4xl">{soldProducts}</h1>
      </CardContent>
    </Card>
  );
}

export default SoldProducts;
