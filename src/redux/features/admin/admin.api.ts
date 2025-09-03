import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    allUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["USER", "WALLET"],
    }),

    allAgents: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["AGENTS", "WALLET"],
    }),

    allAgentsWallets: builder.query({
      query: () => ({
        url: "/admin/wallets",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    allTransactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    blockWallet: builder.mutation({
      query: (phone:string) => ({
        url: `/admin/wallet-block/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags:["WALLET", "USER"]
    }),

    activeWallet: builder.mutation({
      query: (phone:string) => ({
        url: `/admin/wallet-unblock/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags:["WALLET", "USER"]
    }),

  }),
});

export const {
useAllUsersQuery,
useAllAgentsQuery,
useAllAgentsWalletsQuery,
useAllTransactionsQuery,
useBlockWalletMutation,
useActiveWalletMutation
} = adminApi;
