import type { ComponentType } from "react"

export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}


export interface IFeatureCard{
  title?: string, 
  description?: string,
  image:string,
  isContent: boolean,
  bgColor?: string
}


export interface ISidebarItems{
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT"