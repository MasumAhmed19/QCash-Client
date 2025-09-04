import Analytics from "@/pages/Analytics";
import Deposit from "@/pages/User/Deposit";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import type { ISidebarItems } from "@/types";
import CashOut from "@/pages/User/CashOut";
import AddMoney from "@/pages/User/AddMoney";
import Profile from "@/pages/Profile";

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
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Cash Out",
        url: "/user/cash-out",
        component: CashOut,
      },
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney,
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
  },{
    title: " Settings",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      }
    ],
  },
  
];
