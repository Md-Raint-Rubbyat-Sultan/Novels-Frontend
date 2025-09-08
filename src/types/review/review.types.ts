import type { IBook } from "../book/book.type";
import type { IUser } from "../user/user.type";

export interface IReview {
  _id: string;
  reviewerId: string | IUser;
  writerId: string | IUser;
  bookid: string | IBook;
  ratings: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
