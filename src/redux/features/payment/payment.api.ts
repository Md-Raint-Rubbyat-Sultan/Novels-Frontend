import { baseApi } from "@/redux/baseApi";
import type { IPaymet, IResponse } from "@/types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation<
      IResponse<any>,
      Partial<Pick<IPaymet, "amount" | "subscriptionType">>
    >({
      query: ({ amount, subscriptionType }) => ({
        url: `/payment/make-payment`,
        method: "POST",
        data: { amount, subscriptionType },
      }),
      invalidatesTags: ["payment"],
    }),
    getMyPayments: builder.query<IResponse<IPaymet[]>, undefined>({
      query: () => ({
        url: "/payment/my-payments",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const { useMakePaymentMutation, useGetMyPaymentsQuery } = statsApi;
