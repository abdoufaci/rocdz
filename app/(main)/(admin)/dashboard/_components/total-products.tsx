import { Badge } from "@/components/ui/badge";
import { PersentageCalculation } from "@/lib/PersentageCalculation";
import { TrendingDown, TrendingUp } from "lucide-react";
import PercentageBadge from "./percentage-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrdersProps {
  totalProducts?: number;
  LastMonthTotalProducts?: number;
}

function TotalProducts({ totalProducts, LastMonthTotalProducts }: OrdersProps) {
  const percentage = PersentageCalculation({
    lastMonth: LastMonthTotalProducts,
    thisMonth: totalProducts,
  });

  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#191919]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#686868] text-xs font-medium">Total Products</h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-4xl">{totalProducts}</h1>
      </CardContent>
    </Card>
  );
}

export default TotalProducts;
