import type { IRole, IsActive, Subscription_Type } from "..";

export interface IAuthProviders {
  provider: "credentials" | "google";
  providerId: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVarified?: boolean;
  role: IRole;
  auth: IAuthProviders[];
  subscribe: boolean;
  subscriptionType: Subscription_Type | null;
  subscriptionDate: string | null;
  subscriptionExpires: string | null;
  createdAt?: string;
  updatedAt?: string;
}
