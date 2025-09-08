import type { FileMetadata } from "@/hooks/use-file-upload";
import type { ComponentType } from "react";

export type {
  ICradentials,
  ILogin,
  ICerateRequest,
} from "@/types/auth/auth.type";

export type { IUser, IAuthProviders } from "@/types/user/user.type";

export type {
  IRoleChange,
  IRoleChangeStats,
} from "@/types/role_change/roleChange.type";

export type { IBook, IContent } from "@/types/book/book.type";

export type { IReview } from "@/types/review/review.types";

export type { IPaymet } from "@/types/payment/payment.type";

// enums

export type IRole = "SUPER_ADMIN" | "ADMIN" | "WRITER" | "USER";

export type IsActive = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type Subscription_Type = "MONTHLY" | "YEARLY";

export type IRoleStatus = "PENDING" | "ACCEPTED" | "CANCELED";

export type IBookTypes =
  | "NOVEL"
  | "POEM"
  | "SHORT_STORY"
  | "ACADECIM"
  | "OTHERS";

export type IBookLaguage = "en" | "bn" | "unknown";

export type IBookStatus = "ONGOING" | "COMPLETE";

export type IBookStatusType = "PENDING" | "ACCEPTED" | "REJECTED";

export type Payment_Status =
  | "PAID"
  | "UNPAID"
  | "CANCLLED"
  | "FAILED"
  | "REFUNDED";

// enums end

export interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: null | IMetaData;
}

export interface IError {
  success: boolean;
  message: string;
  error: any;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}

export type IImageUpload = File | FileMetadata | null;
