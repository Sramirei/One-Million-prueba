"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type LeadsTrendChartProps = {
  data: {
    label: string;
    count: number;
  }[];
};

export function LeadsTrendChart({ data }: LeadsTrendChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={20} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />
          <Line type="monotone" dataKey="count" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
