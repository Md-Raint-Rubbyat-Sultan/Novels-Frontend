import { Role_Object } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { writerSidebaritems } from "@/routes/writerSidebaritems";

import type { IRole } from "@/types";

export const getSidebarWithUserRole = (userRole: IRole) => {
  switch (userRole) {
    case Role_Object.SUPER_ADMIN:
      return [...userSidebarItems, ...writerSidebaritems, ...adminSidebarItems];

    case Role_Object.ADMIN:
      return [...userSidebarItems, ...writerSidebaritems, ...adminSidebarItems];

    case Role_Object.WRITER:
      return [...userSidebarItems, ...writerSidebaritems];

    case Role_Object.USER:
      return userSidebarItems;

    default:
      return [];
  }
};
