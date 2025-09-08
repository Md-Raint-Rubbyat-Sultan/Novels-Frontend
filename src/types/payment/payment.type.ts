import type { Payment_Status, Subscription_Type } from "..";
import type { IUser } from "../user/user.type";

export interface IPaymet {
  _id: string;
  userId: string | IUser;
  transactionId: string;
  amount: number;
  subscriptionType: Subscription_Type;
  paymentGatewayData?: any;
  invoiceUrl?: string;
  status: Payment_Status;
  createdAt: string;
  updatedAt: string;
}
