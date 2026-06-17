"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function seedNumber(seed: string, i: number, max: number, min = 0) {
  let h = 0;
  const s = `${seed}-${i}`;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100000;
  return min + (h % (max - min));
}

export function ViewsLineChart({ userId }: { userId: string }) {
  const data = Array.from({ length: 14 }).map((_, i) => ({
    day: `${i + 1}`,
    views: seedNumber(userId, i, 40, 5),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#1A6B6B" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function IndustryBarChart({ userId }: { userId: string }) {
  const industries = ["KZ", "UZ", "KG", "TJ", "TM"];
  const data = industries.map((c, i) => ({ country: c, requests: seedNumber(userId, i + 100, 18, 1) }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
        <XAxis dataKey="country" tick={{ fontSize: 11, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
        <Tooltip />
        <Bar dataKey="requests" fill="#C8A84B" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
