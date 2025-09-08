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

    // allTransactions: builder.query({
    //   query: () => ({
    //     url: "/admin/transactions",
    //     method: "GET",
    //   }),
    //   providesTags: ["TRANSACTIONS"],
    // }),

    allTransactions: builder.query({
      query: ({
        page = 1,
        limit = 10,
        startDate,
        endDate,
        type,
        status,
      }: any) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (type && type !== "ALL") params.append("type", type);
        if (status && status !== "ALL") params.append("status", status);

        return {
          url: `/admin/transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),

    blockWallet: builder.mutation({
      query: (phone: string) => ({
        url: `/admin/wallet-block/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),

    activeWallet: builder.mutation({
      query: (phone: string) => ({
        url: `/admin/wallet-unblock/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),

    specificUserDetail: builder.query({
      query: (phone: string) => ({
        url: `admin/userDetail/${phone}`,
        method: "GET",
      }),
    }),

    analyticInfo: builder.query({
      query: () => ({
        url: `admin/analytics`,
        method: "GET",
      }),
    }),

    updateStatus: builder.mutation({
      query: ({
        phone,
        statusInfo,
      }: {
        phone: string;
        statusInfo: { status: string };
      }) => ({
        url: `/admin/activate/${phone}`,
        method: "PATCH",
        data: statusInfo,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllAgentsQuery,
  useAllAgentsWalletsQuery,
  useAllTransactionsQuery,
  useBlockWalletMutation,
  useActiveWalletMutation,
  useSpecificUserDetailQuery,
  useAnalyticInfoQuery,
  useUpdateStatusMutation,
} = adminApi;
