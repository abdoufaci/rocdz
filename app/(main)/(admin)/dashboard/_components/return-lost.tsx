import { PersentageCalculation } from "@/lib/PersentageCalculation";
import PercentageBadge from "./percentage-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrdersProps {
  returnLost?: number;
  LastMonthReturnLost?: number;
}

function ReturnLost({ returnLost, LastMonthReturnLost }: OrdersProps) {
  const percentage = PersentageCalculation({
    lastMonth: LastMonthReturnLost,
    thisMonth: returnLost,
  });

  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#191919]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#686868] text-xs font-medium">Return Lost</h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-4xl">{returnLost} DA</h1>
      </CardContent>
    </Card>
  );
}

export default ReturnLost;
