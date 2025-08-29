import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    sendMoney: builder.mutation({
      query: (transactionInfo) => ({
        url: "/user/wallet/send",
        method: "POST",
        data: transactionInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),

    cashOut: builder.mutation({
      query: (transactionInfo) => ({
        url: "/user/wallet/withdraw",
        method: "POST",
        data: transactionInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),

    addMoney: builder.mutation({
      query: (transactionInfo) => ({
        url: "/user/wallet/add",
        method: "POST",
        data: transactionInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),


    getEachTransactions: builder.query({
      query: (params) => ({
        url: "/user/transactions/me",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTIONS"],
    }),
    
   
  }),
});

export const {
  useSendMoneyMutation,
  useGetEachTransactionsQuery,
  useCashOutMutation,
  useAddMoneyMutation
} = userApi;
