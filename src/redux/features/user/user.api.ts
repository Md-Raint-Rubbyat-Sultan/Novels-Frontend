import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRoleChange, IRoleChangeStats, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IResponse<IUser[]>, unknown>({
      query: (params) => ({
        url: "/user",
        params,
      }),
      providesTags: ["user"],
    }),
    getMe: builder.query<IResponse<IUser>, undefined>({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["user"],
    }),
    getAdmins: builder.query<IResponse<IUser[]>, undefined>({
      query: () => ({
        url: "/user/admins",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<
      IResponse<Partial<IUser>>,
      { _id: string; formData: FormData }
    >({
      query: ({ _id, formData }) => ({
        url: `/user/${_id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["user"],
    }),

    // role change
    roleChangeRequest: builder.mutation<
      IResponse<IRoleChange>,
      { reqRole: string | undefined }
    >({
      query: (info) => ({
        url: "/user/req-role/request",
        method: "POST",
        data: info,
      }),
    }),
    getAllRoleChangeRequests: builder.query<IResponse<IRoleChange[]>, unknown>({
      query: (params) => ({
        url: "/user/req-role/all-req",
        params,
      }),
      providesTags: ["user"],
    }),
    getRoleChangeRequestsStats: builder.query<
      IResponse<IRoleChangeStats>,
      undefined
    >({
      query: (params) => ({
        url: "/user/req-role/stats",
        params,
      }),
      providesTags: ["user"],
    }),
    updateRoleChange: builder.mutation<
      IResponse<string>,
      { _id: string; isAccepted: "ACCEPTED" | "CANCELED" }
    >({
      query: ({ _id, isAccepted }) => ({
        url: `/user/req-role/${_id}`,
        method: "PATCH",
        data: { isAccepted: isAccepted },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMeQuery,
  useGetAdminsQuery,
  useRoleChangeRequestMutation,
  useUpdateUserMutation,
  useGetAllRoleChangeRequestsQuery,
  useGetRoleChangeRequestsStatsQuery,
  useUpdateRoleChangeMutation,
} = userApi;
