import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PercentageBadgeProps {
  percentage: number;
}

function PercentageBadge({ percentage }: PercentageBadgeProps) {
  return (
    <Badge
      variant={percentage < 0 ? "faile" : "success"}
      className="flex items-center gap-[3px] text-[10px]">
      <h5>{percentage}%</h5>
      {percentage < 0 ? (
        <TrendingDown className="h-2.5 w-2.5" />
      ) : (
        <TrendingUp className="h-2.5 w-2.5" />
      )}
    </Badge>
  );
}

export default PercentageBadge;
