import { useState } from "react";
import { LogOut, Sun, Moon, Bell, Shield, Palette, User, Camera, Save, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

export function Settings() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => navigate("/login");

  return (
    <div className="max-w-2xl mx-auto space-y-6 font-[Poppins,sans-serif]">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your account & preferences</p>
      </div>

      {/* Profile section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Profile</h2>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">JD</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
              <Camera className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
            <span className="mt-1.5 inline-flex items-center text-xs px-2.5 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-lg font-medium">
              Pro member
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:-translate-y-0.5 hover:shadow-xl"
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isDark ? "bg-slate-700 text-indigo-400" : "bg-amber-100 text-amber-600"}`}>
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {isDark ? "Dark Mode" : "Light Mode"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isDark ? "Easy on the eyes" : "Bright and clean"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDark}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${
              isDark ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                isDark ? "left-6" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h2>
        </div>

        <div className="space-y-3">
          {[
            { label: "Push Notifications", desc: "Receive app notifications", state: notifications, setState: setNotifications },
            { label: "Email Digest", desc: "Weekly summary via email", state: emailDigest, setState: setEmailDigest },
            { label: "Task Reminders", desc: "Remind me of pending tasks", state: taskReminders, setState: setTaskReminders },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <button
                onClick={() => item.setState(!item.state)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                  item.state ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                    item.state ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-md">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Account</h2>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Change Password</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Export Data</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </button>

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
