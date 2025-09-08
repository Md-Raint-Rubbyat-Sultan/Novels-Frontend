import { baseApi } from "@/redux/baseApi";
import type { IBook, IBookStatusType, IResponse } from "@/types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPublishedBooks: builder.query<IResponse<IBook[]>, unknown>({
      query: (params) => ({
        url: "/book",
        params,
      }),
      providesTags: ["books"],
    }),
    getMyBooks: builder.query<IResponse<IBook[]>, unknown>({
      query: (params) => ({
        url: "/book/my-books",
        params,
      }),
      providesTags: ["books"],
    }),
    getSingleBooks: builder.query<IResponse<IBook>, string>({
      query: (_id) => ({
        url: `/book/${_id}`,
      }),
      providesTags: ["books"],
    }),
    getAllBooks: builder.query<IResponse<IBook[]>, unknown>({
      query: (params) => ({
        url: "/book/all-books",
        params,
      }),
      providesTags: ["books"],
    }),
    getAllPendingBooks: builder.query<IResponse<IBook[]>, unknown>({
      query: (params) => ({
        url: "/book/pending-books",
        params,
      }),
      providesTags: ["books"],
    }),
    cerateABook: builder.mutation<IResponse<IBook[]>, FormData>({
      query: (formData) => ({
        url: "/book/create",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["books"],
    }),
    addBook: builder.mutation<
      IResponse<IBook[]>,
      { status: IBookStatusType } & { _id: string }
    >({
      query: ({ status, _id }) => ({
        url: `/book/add-book/${_id}`,
        method: "PATCH",
        data: {
          bookStatus: status,
        },
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation<
      IResponse<IBook[]>,
      { _id: string; formData: FormData }
    >({
      query: ({ _id, formData }) => ({
        url: `/book/update-book/${_id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<IResponse<IBook[]>, string>({
      query: (_id) => ({
        url: `/book/delete-book/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllPublishedBooksQuery,
  useGetMyBooksQuery,
  useGetSingleBooksQuery,
  useGetAllBooksQuery,
  useCerateABookMutation,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetAllPendingBooksQuery,
} = statsApi;
