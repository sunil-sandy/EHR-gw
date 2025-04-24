"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface PieChartProps {
  data: {
    name: string
    value: number
  }[]
  innerRadius?: number
  outerRadius?: number
  colors?: string[]
}

export function PieChart({ data, innerRadius = 0, outerRadius = 80, colors }: PieChartProps) {
  const defaultColors = ["#5a67f6", "#00b894", "#fdcb6e", "#e84393", "#e17055", "#6c5ce7", "#00cec9", "#636e72"]
  const chartColors = colors || defaultColors

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}`, ""]} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
