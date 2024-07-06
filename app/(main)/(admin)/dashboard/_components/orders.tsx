import { PersentageCalculation } from "@/lib/PersentageCalculation";
import PercentageBadge from "./percentage-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrdersProps {
  orders?: number;
  lastMonthOrders?: number;
}

function Orders({ orders, lastMonthOrders }: OrdersProps) {
  const percentage = PersentageCalculation({
    lastMonth: lastMonthOrders,
    thisMonth: orders,
  });
  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#191919]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#686868] text-xs font-medium">Online Orders</h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-4xl">{orders}</h1>
      </CardContent>
    </Card>
  );
}

export default Orders;
