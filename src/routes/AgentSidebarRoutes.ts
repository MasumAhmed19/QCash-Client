import Analytics from "@/pages/Admin/Analytics";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import Commissions from "@/pages/Agent/Commissions";
import Profile from "@/pages/Profile";
import Transactions from "@/pages/User/Transactions";
import type { ISidebarItems } from "@/types";

export const agentSidebarItems :ISidebarItems[] = [
  {
    title: "Home",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: Analytics,
      },
    ],
  },{
    title: "Wallet Operations",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        component: CashOut,
      },
    ],
  },{
    title: "Transactions",
    items: [
      {
        title: "History",
        url: "/agent/transactions",
        component: Transactions,
      },
      {
        title: "Commissions",
        url: "/agent/commissions",
        component: Commissions,
      },
    ],
  },{
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
      {
        title: "App Settings",
        url: "/agent/settings",
        component: Analytics,
      },
    ],
  },
  
];
