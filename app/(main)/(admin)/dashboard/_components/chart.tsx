import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  chart: {
    month: string;
    sales: number | undefined;
  }[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Chart({ chart }: ChartProps) {
  var date = new Date();

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  const thisMonth = chart.find((chart) => chart.month === month);

  const convertedMoney = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "DZD",
  }).format(thisMonth?.sales ?? 0);

  return (
    <div className="bg-white border rounded-2xl shadow-md shadow-black/5 w-full h-[500px] space-y-5 pb-16 p-5">
      <div className="flex items-center gap-2">
        <LineChart className="text-brand h-5 w-5" />
        <h1 className="text-[#191919] font-semibold text-sm">Monthly Sales</h1>
      </div>
      <div className="font-semibold text-2xl text-[#191919]">
        <h1>
          {convertedMoney}{" "}
          <span className="text-[#7D7D7D] text-xs font-light">
            Earned this month
          </span>{" "}
        </h1>
      </div>

      <ResponsiveContainer width={"100%"} height={"90%"}>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="#FCB707" radius={[7.82, 7.82, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
