import type { IRoleStatus } from "..";
import type { IUser } from "../user/user.type";

export interface IRoleChange {
  _id: string;
  userId: string | IUser;
  currentRole: string;
  requestedRole: string;
  status: IRoleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IRoleChangeStats {
  pendingRequest: number;
  acceptRequest: number;
  cancleRequest: number;
}
