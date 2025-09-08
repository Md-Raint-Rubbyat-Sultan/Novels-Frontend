import type {
  IBookLaguage,
  IBookStatus,
  IBookStatusType,
  IBookTypes,
} from "..";
import type { IReview } from "../review/review.types";
import type { IUser } from "../user/user.type";

export interface IContent {
  chapter: string;
  story: string;
}

export interface IBook {
  _id: string;
  title: string;
  shortDescription: string;
  authorId: string | IUser;
  ratings?: string | IReview;
  bookType: IBookTypes;
  language: IBookLaguage;
  bookStatus: IBookStatusType;
  status: IBookStatus;
  bookmark?: string[];
  content: IContent[];
  bookImage: string;
  createdAt: string;
  updatedAt: string;
}
