import { useState } from "react";
import { Plus, CheckCircle2, Circle, Target, Trophy, X, ChevronRight } from "lucide-react";

type Milestone = { id: number; title: string; completed: boolean };

type Goal = {
  id: number;
  title: string;
  description: string;
  progress: number;
  category: string;
  color: string;
  milestones: Milestone[];
};

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Learn Full-Stack Development",
    description: "Master React, Node.js, and databases",
    progress: 60,
    category: "Learning",
    color: "from-indigo-500 to-blue-500",
    milestones: [
      { id: 1, title: "HTML & CSS Fundamentals", completed: true },
      { id: 2, title: "JavaScript Basics", completed: true },
      { id: 3, title: "React Framework", completed: true },
      { id: 4, title: "Node.js & Express", completed: false },
      { id: 5, title: "Database (SQL/NoSQL)", completed: false },
    ],
  },
  {
    id: 2,
    title: "Get Physically Fit",
    description: "Build strength and endurance",
    progress: 40,
    category: "Health",
    color: "from-emerald-500 to-teal-500",
    milestones: [
      { id: 1, title: "Exercise 3× per week", completed: true },
      { id: 2, title: "Exercise 5× per week", completed: false },
      { id: 3, title: "Run a 5K", completed: false },
      { id: 4, title: "Complete a 10K", completed: false },
    ],
  },
  {
    id: 3,
    title: "Read 24 Books This Year",
    description: "Expand knowledge through reading",
    progress: 25,
    category: "Personal",
    color: "from-violet-500 to-purple-500",
    milestones: [
      { id: 1, title: "Read 6 books", completed: true },
      { id: 2, title: "Read 12 books", completed: false },
      { id: 3, title: "Read 18 books", completed: false },
      { id: 4, title: "Read 24 books", completed: false },
    ],
  },
];

const categoryColors: Record<string, string> = {
  Learning: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Health: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Personal: "bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400",
  Work: "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", description: "", category: "Learning" });
  const [expandedGoal, setExpandedGoal] = useState<number | null>(1);

  const toggleMilestone = (goalId: number, milestoneId: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id !== goalId) return goal;
        const updated = goal.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const progress = Math.round((updated.filter((m) => m.completed).length / updated.length) * 100);
        return { ...goal, milestones: updated, progress };
      })
    );
  };

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const colors = ["from-indigo-500 to-blue-500", "from-emerald-500 to-teal-500", "from-violet-500 to-purple-500", "from-orange-500 to-amber-500"];
      const g: Goal = {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        progress: 0,
        category: newGoal.category,
        color: colors[goals.length % colors.length],
        milestones: [
          { id: 1, title: "Getting started", completed: false },
          { id: 2, title: "Halfway there", completed: false },
          { id: 3, title: "Almost done", completed: false },
          { id: 4, title: "Goal achieved!", completed: false },
        ],
      };
      setGoals([...goals, g]);
      setNewGoal({ title: "", description: "", category: "Learning" });
      setShowAddForm(false);
    }
  };

  const overallProgress = Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length);

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Goals</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track your long-term objectives
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-200 hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {/* Overall progress banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent)]" />
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-200 text-sm font-medium">Overall Progress</p>
            <p className="text-white text-2xl font-bold">{overallProgress}%</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-indigo-200 text-xs mt-2">{goals.length} active goals · {goals.filter(g => g.progress === 100).length} completed</p>
      </div>

      {/* Add goal form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">New Goal</h3>
            <button onClick={() => setShowAddForm(false)} className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="Goal title..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              autoFocus
            />
            <input
              type="text"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="Short description (optional)..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            >
              <option>Learning</option>
              <option>Health</option>
              <option>Personal</option>
              <option>Work</option>
            </select>
            <div className="flex gap-2">
              <button onClick={addGoal} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium hover:opacity-90 transition-all">
                Add Goal
              </button>
              <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals list */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const isExpanded = expandedGoal === goal.id;
          const completedMilestones = goal.milestones.filter((m) => m.completed).length;

          return (
            <div
              key={goal.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Goal header */}
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-md shrink-0`}>
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{goal.title}</h3>
                      <span className={`shrink-0 text-xs px-2.5 py-1 rounded-lg font-medium ${categoryColors[goal.category] || "bg-slate-100 text-slate-600"}`}>
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{goal.description}</p>
                  </div>
                  <button
                    onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
                    className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-all shrink-0"
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {completedMilestones}/{goal.milestones.length} milestones
                    </span>
                    <span className={`text-sm font-bold bg-gradient-to-r ${goal.color} bg-clip-text text-transparent`}>
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones (collapsible) */}
              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                    Milestones
                  </p>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone, idx) => (
                      <button
                        key={milestone.id}
                        onClick={() => toggleMilestone(goal.id, milestone.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group text-left"
                      >
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          milestone.completed
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
                        }`}>
                          {milestone.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </span>
                        <div className="flex-1">
                          <span
                            className={`text-sm font-medium ${
                              milestone.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {milestone.title}
                          </span>
                        </div>
                        <span className={`text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold ${
                          milestone.completed ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        }`}>
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
