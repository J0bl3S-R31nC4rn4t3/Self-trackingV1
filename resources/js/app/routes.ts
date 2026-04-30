import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Calendar } from "./pages/Calendar";
import { Goals } from "./pages/Goals";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "tasks", Component: Tasks },
      { path: "calendar", Component: Calendar },
      { path: "goals", Component: Goals },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
    ],
  },
]);
