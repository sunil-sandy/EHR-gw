"use client"

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AreaChartProps {
  data: any[]
  xAxisDataKey: string
  areas: {
    dataKey: string
    name?: string
    color?: string
  }[]
  stacked?: boolean
}

export function AreaChart({ data, xAxisDataKey, areas, stacked = false }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {areas.map((area, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name || area.dataKey}
            stroke={area.color || `var(--chart-${index + 1})`}
            fill={area.color || `var(--chart-${index + 1})`}
            fillOpacity={0.3}
            stackId={stacked ? "1" : undefined}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
