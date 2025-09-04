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

    updateInfo: builder.mutation({
      query: (userInfo) => ({
        url: "/user/update-information",
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags:["USER"]
    }),

    updateProfilePic: builder.mutation({
      query: (formData) => ({
        url: "/user/update-profile-pic",
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags:["USER"]
    }),


    
   
  }),
});

export const {
  useSendMoneyMutation,
  useGetEachTransactionsQuery,
  useCashOutMutation,
  useAddMoneyMutation,
  useUpdateInfoMutation,
  useUpdateProfilePicMutation
} = userApi;
