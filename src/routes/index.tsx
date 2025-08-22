import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Registration";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
        Component: Login,
        path: '/login'
    },{
        Component: Register,
        path: '/register'
    },{
        Component: Verify,
        path: '/verify'
    }
])