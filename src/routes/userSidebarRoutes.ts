import Analytics from "@/pages/Admin/Analytics";
import Profile from "@/pages/Profile";
import Deposit from "@/pages/User/Deposit";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import WithDraw from "@/pages/User/WithDraw";
import type { ISidebarItems } from "@/types";

export const userSidebar :ISidebarItems[] = [
  {
    title: "Home",
    items: [
      {
        title: "Analytics",
        url: "/user/analytics",
        component: Analytics,
      },
    ],
  },{
    title: "Wallet",
    items: [
      {
        title: "Deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: WithDraw,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
    ],
  },{
    title: "Transactions",
    items: [
      {
        title: "History",
        url: "/user/transactions",
        component: Transactions,
      },
    ],
  }
  
];
