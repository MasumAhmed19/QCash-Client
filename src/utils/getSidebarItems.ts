import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSIdebarRoutes";
import { agentSidebarItems } from "@/routes/AgentSidebarRoutes";
import { userSidebar } from "@/routes/userSidebarRoutes";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole:TRole)=>{
    switch (userRole) {
    // case role.superAdmin:
    //   return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebar];
    case role.agent:
      return [...agentSidebarItems];
    default:
      return [];
  }
}