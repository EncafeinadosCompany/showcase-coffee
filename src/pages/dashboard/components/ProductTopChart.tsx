"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Café Americano", value: 400 },
  { name: "Cappuccino", value: 300 },
  { name: "Latte", value: 250 },
  { name: "Espresso", value: 200 },
  { name: "Mocha", value: 150 },
]

const COLORS = ["#8B4513", "#A0522D", "#D2691E", "#CD853F", "#DEB887"]

export default function TopProductosChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={150} fill="#8884d8" dataKey="value">
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

