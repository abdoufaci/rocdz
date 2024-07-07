import { Map, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TopWilayasProps {
  chartData?: {
    wilaya: string;
    sales?: number;
  }[];
}

const chartConfig = {
  desktop: {
    label: "descktop",
    color: "#424040",
  },
} satisfies ChartConfig;

export function TopWilayas({ chartData }: TopWilayasProps) {
  const containerHeight = `${chartData ? chartData.length * (20 + 10) : 200}px`;

  return (
    <Card className="bg-white rounded-2xl space-y-0 w-full max-w-[450px] h-fit max-h-[500px]">
      <CardHeader>
        <div className="flex justify-start items-center gap-2">
          <Map className="h-5 w-5 text-brand" />
          <CardTitle className="font-semibold text-base text-[#191919]">
            Top Wilayas{" "}
            <span className="text-[#7D7D7D] text-xs font-light ">
              This Month
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-[90%]"
          style={{
            height: containerHeight,
          }}
          config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
                right: 40,
              }}>
              <XAxis type="number" dataKey="sales" hide />
              <YAxis
                dataKey="wilaya"
                type="category"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="sales" fill="#FCB707" radius={3.58}>
                <LabelList
                  dataKey="sales"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
