import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const MyPayments = lazy(() => import("@/pages/User/MyPayments"));
const MyReviews = lazy(() => import("@/pages/User/MyReviews"));
const Profile = lazy(() => import("@/pages/User/Profile"));

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "User",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        Component: Profile,
      },
      {
        title: "My Reviews",
        url: "/user/my-reviews",
        Component: MyReviews,
      },
      {
        title: "My Paments",
        url: "/user/my-payments",
        Component: MyPayments,
      },
    ],
  },
];
