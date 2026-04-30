import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Flame,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const chartData = [
  { day: "Mon", completed: 4, target: 6 },
  { day: "Tue", completed: 6, target: 6 },
  { day: "Wed", completed: 5, target: 6 },
  { day: "Thu", completed: 8, target: 6 },
  { day: "Fri", completed: 7, target: 6 },
  { day: "Sat", completed: 9, target: 6 },
  { day: "Sun", completed: 6, target: 6 },
];

const initialTasks = [
  { id: 1, title: "Morning Exercise", tag: "Health", completed: true },
  { id: 2, title: "Study Programming", tag: "Learning", completed: false },
  { id: 3, title: "Drink 8 Glasses of Water", tag: "Health", completed: false },
  { id: 4, title: "Read for 30 minutes", tag: "Learning", completed: true },
  { id: 5, title: "Meditate 10 minutes", tag: "Wellness", completed: false },
];

const tagColors: Record<string, string> = {
  Health: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Learning: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Wellness: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const summaryCards = [
    {
      label: "Tasks Completed",
      value: "24",
      change: "+4 today",
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      bgGlow: "shadow-emerald-200 dark:shadow-emerald-900/40",
      changeBg: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Pending Tasks",
      value: "8",
      change: "2 due today",
      icon: Clock,
      gradient: "from-indigo-500 to-blue-500",
      bgGlow: "shadow-indigo-200 dark:shadow-indigo-900/40",
      changeBg: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Current Streak",
      value: "12 days",
      change: "Personal best!",
      icon: Flame,
      gradient: "from-orange-500 to-amber-500",
      bgGlow: "shadow-orange-200 dark:shadow-orange-900/40",
      changeBg: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 lg:p-8 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-white/5 border border-white/10" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span className="text-indigo-200 text-sm font-medium">Wednesday, April 29</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
            Good morning, John! 👋
          </h1>
          <p className="text-indigo-200 text-sm lg:text-base">
            You've completed <span className="text-white font-semibold">{completedCount}/{tasks.length} tasks</span> today. Keep it up!
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.bgGlow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{card.value}</p>
              <p className={`text-xs font-medium ${card.changeBg}`}>↑ {card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Weekly Progress</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tasks completed this week</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 inline-block" />
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
              Target
            </span>
          </div>
        </div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} fill="url(#targetGrad)" strokeDasharray="4 4" name="Target" dot={false} />
              <Area type="monotone" dataKey="completed" stroke="#6366F1" strokeWidth={2.5} fill="url(#completedGrad)" name="Completed" dot={{ fill: "#6366F1", r: 4, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's tasks */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Today's Tasks</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {completedCount} of {tasks.length} completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {Math.round((completedCount / tasks.length) * 100)}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group text-left
                ${task.completed
                  ? "bg-slate-50 dark:bg-slate-800/50 opacity-70"
                  : "hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20"
                }`}
            >
              <span className="shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors" />
                )}
              </span>
              <span
                className={`flex-1 text-sm font-medium ${task.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}
              >
                {task.title}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${tagColors[task.tag] || "bg-slate-100 text-slate-600"}`}>
                {task.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
