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


export interface ITransactionType{
    "SEND"?:string,
    "ADD"?:string,
    "WITHDRAW"?:string,
    "CASH_IN"?:string,
    "CASH_OUT"?:string,
    "B2B_TRANSFER"?: string
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT"


export type TransactionType= "SEND" | "ADD"| "WITHDRAW"| "WITHDRAW"| "CASH_IN"| "CASH_OUT" | "B2B_TRANSFER"




 interface From {
  _id: string
  name: string
  phone: string
}

 interface To {
  _id: string
  name: string
  phone: string
}

 interface Initiator {
  _id: string
  name: string
  phone: string
}
export interface ITransactions {
  _id: string
  from: From
  to: To
  type: string
  amount: number
  status: string
  initiator: Initiator
  fee: number
  commission: number
  createdAt: string
  updatedAt: string
}


export interface IWallet {
  _id?: string,
  status?: "ACTIVE" | "BLOCKED",
  balance?: number
}

export interface IUser {
    _id?: string,
    name: string,
    email?: string,
    phone: string, 
    presentAddress?: string,
    permanentAddress?: string,
    nidNumber?: string,
    picture?:string,
    bankAccount?:string,
    role: TRole,
    status: 'ACTIVE' | 'PENDING' | 'SUSPEND',
    isVerified?: boolean, 
    transactions?: string[],
    wallet?: IWallet
}


export interface ITransaction{
    _id?: string,
    from?: IUser
    to?: IUser,
    type?: ITransactionType,
    amount?: number,
    status?: 'COMPLETE' | 'FAILED' | 'PENDING',
    initiator?: IUser
    fee?: number,
    commission?: number,
}