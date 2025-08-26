import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (Component:ComponentType, requiredRole:TRole)=>{
    return function AuthWrapper() {
        const {data, isLoading} = useUserInfoQuery(undefined)
        // data ashche and login na kore user onno kono route e gele
        if(!isLoading && !data?.data?.phone){
            return <Navigate to='/login' />
        }

        // admin && data asche && admin!== user --> unauthorize access
        if(requiredRole && !isLoading && requiredRole !== data?.data?.role){
            return <Navigate to='/unauthorized' />
        }

        return <Component />
    }
}