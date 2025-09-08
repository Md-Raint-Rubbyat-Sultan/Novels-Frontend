import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularBooks: builder.query<IResponse<any>, undefined>({
      query: () => ({
        url: "/stats/popular-books",
      }),
      providesTags: ["stats"],
    }),
    getPopularWriters: builder.query<IResponse<any>, undefined>({
      query: () => ({
        url: "/stats/popular-writers",
      }),
      providesTags: ["stats"],
    }),
    getUserStats: builder.query<IResponse<any>, undefined>({
      query: () => ({
        url: "/stats/user",
      }),
      providesTags: ["stats"],
    }),
    getPaymentStats: builder.query<IResponse<any>, undefined>({
      query: () => ({
        url: "/stats/payment",
      }),
      providesTags: ["stats"],
    }),
  }),
});

export const {
  useGetPopularBooksQuery,
  useGetPopularWritersQuery,
  useGetUserStatsQuery,
  useGetPaymentStatsQuery,
} = statsApi;
