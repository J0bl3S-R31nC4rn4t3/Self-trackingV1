import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Award, Zap, Lightbulb, ArrowUpRight, ArrowDownRight } from "lucide-react";

const weeklyData = [
  { day: "Mon", completed: 4, missed: 1 },
  { day: "Tue", completed: 6, missed: 0 },
  { day: "Wed", completed: 5, missed: 2 },
  { day: "Thu", completed: 8, missed: 0 },
  { day: "Fri", completed: 7, missed: 1 },
  { day: "Sat", completed: 9, missed: 0 },
  { day: "Sun", completed: 6, missed: 1 },
];

const monthlyData = [
  { week: "Week 1", completed: 28, missed: 3 },
  { week: "Week 2", completed: 32, missed: 2 },
  { week: "Week 3", completed: 30, missed: 4 },
  { week: "Week 4", completed: 35, missed: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {p.name}: <span style={{ color: p.color }}>{p.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const insights = [
  { text: "You're most consistent on Thursdays — best completion rate", type: "positive" },
  { text: "Completion rate improved by 15% compared to last month", type: "positive" },
  { text: "Wednesday has the highest miss rate — consider lighter tasks", type: "warning" },
  { text: "You're on track to beat your personal best streak this week!", type: "positive" },
];

export function Analytics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const data = period === "weekly" ? weeklyData : monthlyData;
  const xKey = period === "weekly" ? "day" : "week";

  const stats = [
    {
      label: "Total Completed",
      value: "124",
      change: "+12%",
      positive: true,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-blue-500",
      shadow: "shadow-indigo-200 dark:shadow-indigo-900/40",
    },
    {
      label: "Completion Rate",
      value: "87%",
      change: "+5%",
      positive: true,
      icon: Award,
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-200 dark:shadow-emerald-900/40",
    },
    {
      label: "Best Streak",
      value: "18 days",
      change: "Current: 12",
      positive: true,
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-200 dark:shadow-amber-900/40",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      {/* Header with period toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Insights into your productivity</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
          {(["weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                period === p
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  stat.positive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Area chart - trend */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Completion Trend</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Tasks completed over time</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 inline-block" />
              Completed
            </span>
          </div>
        </div>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="completedArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#6366F1"
                strokeWidth={2.5}
                fill="url(#completedArea)"
                name="Completed"
                dot={{ fill: "#6366F1", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Completed vs Missed</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Side-by-side comparison</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              Missed
            </span>
          </div>
        </div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" name="Completed" radius={[6, 6, 0, 0]} fill="#10B981" />
              <Bar dataKey="missed" name="Missed" radius={[6, 6, 0, 0]} fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200 dark:shadow-amber-900/40">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Smart Insights</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">AI-generated recommendations</p>
          </div>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:-translate-x-0.5 ${
                insight.type === "positive"
                  ? "bg-emerald-50/70 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20"
                  : "bg-amber-50/70 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${insight.type === "positive" ? "bg-emerald-500" : "bg-amber-500"}`} />
              <p className={`text-sm ${insight.type === "positive" ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
