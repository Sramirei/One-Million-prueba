"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type SourceDistributionChartProps = {
  data: {
    label: string;
    count: number;
    color: string;
  }[];
};

export function SourceDistributionChart({ data }: SourceDistributionChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />
          <Pie innerRadius={78} outerRadius={112} paddingAngle={4} data={data} dataKey="count" nameKey="label">
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
