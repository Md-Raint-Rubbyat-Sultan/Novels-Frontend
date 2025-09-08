import { baseApi } from "@/redux/baseApi";
import type { ICradentials, ILogin, IResponse, IUser } from "@/types";

export const auhtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IResponse<IUser>, FormData>({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse<ICradentials>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    changePassword: builder.mutation<
      IResponse<null>,
      { oldPassword: string; newPassword: string }
    >({
      query: (passwords) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passwords,
      }),
    }),
    logout: builder.mutation<IResponse<null>, undefined>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = auhtApi;
