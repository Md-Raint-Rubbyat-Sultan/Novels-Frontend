import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((item) => ({
      path: item.url,
      Component: item.Component,
    }))
  );
};
