import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    cashIn: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),

    b2bTransfer: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/b2b-transfer",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),

     agentAddMoney: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/add-money",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["TRANSACTIONS"]
    }),

  }),
});

export const {
  useCashInMutation,
  useB2bTransferMutation,
  useAgentAddMoneyMutation
} = agentApi;
