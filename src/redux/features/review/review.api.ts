import { baseApi } from "@/redux/baseApi";
import type { IResponse, IReview } from "@/types";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<IResponse<IReview>, Partial<IReview>>({
      query: (review) => ({
        url: "/review/create",
        method: "POST",
        data: review,
      }),
      invalidatesTags: ["review"],
    }),
    getRecentReviews: builder.query<IResponse<IReview[]>, unknown>({
      query: (params) => ({
        url: "/review/all-reviews",
        params,
      }),
      providesTags: ["review"],
    }),
    getMyReviews: builder.query<IResponse<IReview[]>, unknown>({
      query: (params) => ({
        url: "/review/my-reviews",
        params,
      }),
      providesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetRecentReviewsQuery,
  useGetMyReviewsQuery,
} = reviewApi;
