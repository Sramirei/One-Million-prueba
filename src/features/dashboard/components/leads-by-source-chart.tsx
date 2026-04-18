"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type LeadsBySourceChartProps = {
  data: {
    label: string;
    count: number;
    color: string;
  }[];
};

export function LeadsBySourceChart({ data }: LeadsBySourceChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "color-mix(in oklab, var(--primary) 8%, transparent)" }}
            contentStyle={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />
          <Bar dataKey="count" radius={[12, 12, 0, 0]}>
            {data.map((entry) => (
              <Bar key={entry.label} dataKey="count" fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
