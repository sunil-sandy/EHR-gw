"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface BarChartProps {
  data: any[]
  xAxisDataKey: string
  bars: {
    dataKey: string
    name?: string
    color?: string
  }[]
}

export function BarChart({ data, xAxisDataKey, bars }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.color || `var(--chart-${index + 1})`}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
