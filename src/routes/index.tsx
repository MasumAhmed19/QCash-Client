import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Registration";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSIdebarRoutes";
import { userSidebar } from "./userSidebarRoutes";
import { agentSidebarItems } from "./AgentSidebarRoutes";
import { generateRoutes } from "@/utils/generateRoutes";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children:[
            {
                index: true,
                Component: Home,
            },{
                path:'/about',
                Component: About
            }
        ]
    },{
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: '/admin',
        children: [{index:true, element:<Navigate to='/admin/analytics' />}, ...generateRoutes(adminSidebarItems)]
    },{
        Component: withAuth(DashboardLayout, role.agent as TRole),
        path: '/agent',
        children: [{index:true, element:<Navigate to='/agent/analytics' />},...generateRoutes(agentSidebarItems)]
    },{
        Component:withAuth(DashboardLayout, role.user as TRole),
        path: '/user',
        children: [{index:true, element:<Navigate to='/user/analytics' />},...generateRoutes(userSidebar)]
    },{
        Component: Login,
        path: '/login'
    },{
        Component: Register,
        path: '/register'
    },{
        Component: Verify,
        path: '/verify'
    },{
        Component: Unauthorized,
        path:'/unauthorized'
    }
])