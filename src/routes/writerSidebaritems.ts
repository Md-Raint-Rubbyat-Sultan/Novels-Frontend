import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const MyBooks = lazy(() => import("@/pages/Writer/MyBooks"));

export const writerSidebaritems: ISidebarItems[] = [
  {
    title: "Writer",
    items: [
      {
        title: "My Books",
        url: "/writer/my-books",
        Component: MyBooks,
      },
    ],
  },
];
