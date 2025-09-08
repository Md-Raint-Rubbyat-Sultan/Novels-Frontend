import type { IUser } from "../user/user.type";

export interface ICerateRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICradentials {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
