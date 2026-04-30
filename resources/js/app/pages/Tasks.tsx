import { useState } from "react";
import { Plus, CheckCircle2, Circle, Trash2, Tag, Flag, Search, X } from "lucide-react";

type Priority = "High" | "Medium" | "Low";
type Category = "Daily" | "Weekly" | "Work" | "Personal";

type Task = {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Morning Exercise", category: "Daily", priority: "High", completed: false },
  { id: 2, title: "Study Programming", category: "Daily", priority: "High", completed: true },
  { id: 3, title: "Drink 8 Glasses of Water", category: "Daily", priority: "Medium", completed: false },
  { id: 4, title: "Read for 30 minutes", category: "Weekly", priority: "Low", completed: false },
  { id: 5, title: "Plan weekly goals", category: "Work", priority: "Medium", completed: true },
  { id: 6, title: "Call a friend", category: "Personal", priority: "Low", completed: false },
];

const priorityConfig: Record<Priority, { bg: string; text: string; dot: string }> = {
  High: { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
  Medium: { bg: "bg-amber-100 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  Low: { bg: "bg-slate-100 dark:bg-slate-700", text: "text-slate-600 dark:text-slate-400", dot: "bg-slate-400" },
};

const categoryConfig: Record<Category, string> = {
  Daily: "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  Weekly: "bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400",
  Work: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Personal: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", category: "Daily" as Category, priority: "Medium" as Priority });

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || (filter === "completed" ? task.completed : !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleTask = (id: number) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id: number) => setTasks(tasks.filter((t) => t.id !== id));

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
      setNewTask({ title: "", category: "Daily", priority: "Medium" });
      setShowAddForm(false);
    }
  };

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Task Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {counts.pending} pending · {counts.completed} completed
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Add task form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 p-5 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">New Task</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <div className="flex gap-3">
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Category })}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Work</option>
                <option>Personal</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={addTask}
                className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium transition-all hover:opacity-90"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(["all", "pending", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                filter === f
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {f}
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${filter === f ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No tasks found</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const pri = priorityConfig[task.priority];
            return (
              <div
                key={task.id}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  task.completed
                    ? "bg-slate-50/60 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-700/40 opacity-70"
                    : "bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-md hover:shadow-indigo-50 dark:hover:shadow-indigo-900/10"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 transition-transform hover:scale-110"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      task.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${categoryConfig[task.category]}`}>
                      <Tag className="w-3 h-3" />
                      {task.category}
                    </span>
                    <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${pri.bg} ${pri.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
                      {task.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="shrink-0 w-8 h-8 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
