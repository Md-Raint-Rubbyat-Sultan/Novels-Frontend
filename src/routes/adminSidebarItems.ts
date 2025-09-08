import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AllBooks = lazy(() => import("@/pages/Admin/AllBooks"));
const PendingBooks = lazy(() => import("@/pages/Admin/PendingBooks"));
const Stats = lazy(() => import("@/pages/Admin/Stats"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Pending Books",
        url: "/admin/pending-books",
        Component: PendingBooks,
      },
      {
        title: "All Books",
        url: "/admin/all-books",
        Component: AllBooks,
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Stats",
        url: "/admin/stats",
        Component: Stats,
      },
    ],
  },
];
