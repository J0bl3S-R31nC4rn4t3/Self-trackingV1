import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, CalendarDays } from "lucide-react";

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type DayStatus = "completed" | "missed" | "partial" | null;

const dayData: Record<number, { status: DayStatus; tasks: string[] }> = {
  1:  { status: "completed", tasks: ["Exercise", "Read", "Study"] },
  3:  { status: "completed", tasks: ["Exercise", "Meditate", "Study", "Journaling"] },
  5:  { status: "partial",   tasks: ["Exercise", "Study"] },
  7:  { status: "completed", tasks: ["Exercise", "Read", "Hydration"] },
  9:  { status: "missed",    tasks: [] },
  10: { status: "completed", tasks: ["Exercise", "Read"] },
  12: { status: "completed", tasks: ["Study", "Meditate", "Exercise"] },
  13: { status: "missed",    tasks: [] },
  14: { status: "partial",   tasks: ["Hydration"] },
  15: { status: "completed", tasks: ["Exercise", "Study", "Journaling"] },
  18: { status: "completed", tasks: ["Exercise", "Read"] },
  19: { status: "missed",    tasks: [] },
  20: { status: "completed", tasks: ["Exercise", "Study", "Meditate"] },
  22: { status: "partial",   tasks: ["Read"] },
  24: { status: "missed",    tasks: [] },
  25: { status: "completed", tasks: ["Exercise", "Study", "Read"] },
  28: { status: "partial",   tasks: ["Exercise"] },
  29: { status: "partial",   tasks: ["Exercise", "Study"] },
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(29);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = 29;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const selectedDayData = selectedDay ? dayData[selectedDay] : null;

  const statusInfo = {
    completed: { label: "Completed", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20", icon: CheckCircle2, dot: "bg-emerald-500" },
    partial:   { label: "Partial",   color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",   icon: Clock,         dot: "bg-amber-500" },
    missed:    { label: "Missed",    color: "text-red-600 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20",             icon: XCircle,       dot: "bg-red-500" },
  };

  const monthlySummary = {
    completed: Object.values(dayData).filter((d) => d.status === "completed").length,
    partial:   Object.values(dayData).filter((d) => d.status === "partial").length,
    missed:    Object.values(dayData).filter((d) => d.status === "missed").length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      {/* Monthly summary */}
      <div className="grid grid-cols-3 gap-4">
        {(["completed", "partial", "missed"] as const).map((status) => {
          const info = statusInfo[status];
          const Icon = info.icon;
          return (
            <div key={status} className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-4 shadow-sm`}>
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${info.bg} border`}>
                  <Icon className={`w-4 h-4 ${info.color}`} />
                </span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{info.label}</p>
                  <p className={`text-xl font-bold ${info.color}`}>{monthlySummary[status]} days</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {monthNames[month]} {year}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Monthly overview</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={previousMonth}
                className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-500 dark:text-slate-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-500 dark:text-slate-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map((day) => {
              const data = dayData[day];
              const isSelected = selectedDay === day;
              const isToday = day === today;

              let dotBg = "";
              if (data?.status === "completed") dotBg = "bg-emerald-500";
              else if (data?.status === "partial") dotBg = "bg-amber-500";
              else if (data?.status === "missed") dotBg = "bg-red-500";

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    relative flex flex-col items-center justify-center aspect-square rounded-xl text-sm transition-all duration-200
                    ${isSelected
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 scale-105"
                      : isToday
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }
                  `}
                >
                  <span className={`text-sm font-medium ${isToday && !isSelected ? "font-bold" : ""}`}>{day}</span>
                  {dotBg && (
                    <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white/70" : dotBg}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            {(["completed", "partial", "missed"] as const).map((status) => (
              <span key={status} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className={`w-2 h-2 rounded-full ${statusInfo[status].dot}`} />
                {statusInfo[status].label}
              </span>
            ))}
          </div>
        </div>

        {/* Day detail panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
          {selectedDay ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {monthNames[month]} {selectedDay}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{year}</p>
                </div>
              </div>

              {selectedDayData ? (
                <div className="space-y-4">
                  {/* Status badge */}
                  {selectedDayData.status && (
                    <div className={`flex items-center gap-2 p-3 rounded-xl border ${statusInfo[selectedDayData.status].bg}`}>
                      {(() => {
                        const Icon = statusInfo[selectedDayData.status!].icon;
                        return <Icon className={`w-4 h-4 ${statusInfo[selectedDayData.status!].color} shrink-0`} />;
                      })()}
                      <span className={`text-sm font-medium ${statusInfo[selectedDayData.status].color}`}>
                        {selectedDayData.status === "completed"
                          ? "All tasks completed!"
                          : selectedDayData.status === "partial"
                          ? "Some tasks completed"
                          : "No tasks completed"}
                      </span>
                    </div>
                  )}

                  {/* Tasks */}
                  {selectedDayData.tasks.length > 0 ? (
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        Completed Tasks
                      </p>
                      <div className="space-y-2">
                        {selectedDayData.tasks.map((t, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <XCircle className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400 dark:text-slate-500">No tasks completed</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CalendarDays className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-400 dark:text-slate-500">No data for this day</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <CalendarDays className="w-7 h-7 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Select a day</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Click on any date to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
