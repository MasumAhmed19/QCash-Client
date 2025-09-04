// import Analytics from "@/pages/Admin/Analytics";
import ManageUsers from "@/pages/Admin/ManageUsers";
import ManageAgents from "@/pages/Admin/ManageAgents";
import Transactions from "@/pages/Admin/Transactions";
import Profile from "@/pages/Profile";
import type { ISidebarItems } from "@/types";
import AnalyticDashboard from "@/pages/Admin/AnalyticDashbord";

export const adminSidebarItems :ISidebarItems[] = [
  {
    title: "Home",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: AnalyticDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        component: ManageUsers,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        component: ManageAgents,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/admin/transactions",
        component: Transactions,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      }
    ],
  },
];
