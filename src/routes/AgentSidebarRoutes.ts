import Analytics from "@/pages/Analytics";
import CashIn from "@/pages/Agent/CashIn";
import Commissions from "@/pages/Agent/Commissions";
import Profile from "@/pages/Profile";
import Transactions from "@/pages/User/Transactions";
import type { ISidebarItems } from "@/types";
import B2BTransfer from "@/pages/Agent/B2BTransfer";
import AddMoney from "@/pages/Agent/AddMoney";

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
        title: "B2B Transfer",
        url: "/agent/b2b-transfer",
        component: B2BTransfer,
      },{
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
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
    ],
  },
  
];
