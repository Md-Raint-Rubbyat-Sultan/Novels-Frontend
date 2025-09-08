import App from "@/App";
import { DashboardLayout } from "@/components/Layouts/Dashboard/DashboardLayout";
import Home from "@/pages/Home";
import { generateRoutes } from "@/utils/generateRoutes";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { writerSidebaritems } from "./writerSidebaritems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { Role_Object } from "@/constants/role";
import type { IRole } from "@/types";

// pages lazy load
const About = lazy(() => import("@/pages/About"));
const Book = lazy(() => import("@/pages/Book"));
const BookDetails = lazy(() => import("@/pages/BookDetails"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Cancelled = lazy(() => import("@/pages/Cancelled"));
const Failed = lazy(() => import("@/pages/Failed"));
const Success = lazy(() => import("@/pages/Success"));
const LoginPage = lazy(() => import("@/pages/Authentication/LoginPage"));
const RegistrationPage = lazy(
  () => import("@/pages/Authentication/RegistrationPage")
);
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "books",
        Component: Book,
      },
      {
        path: "books/:id",
        Component: withAuth(BookDetails),
      },
      {
        path: "pricing",
        Component: Pricing,
      },
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout),
    children: generateRoutes(userSidebarItems),
  },
  {
    path: "/writer",
    Component: withAuth(DashboardLayout, [
      Role_Object.WRITER,
      Role_Object.ADMIN,
      Role_Object.SUPER_ADMIN,
    ] as IRole[]),
    children: generateRoutes(writerSidebaritems),
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, [
      Role_Object.ADMIN,
      Role_Object.SUPER_ADMIN,
    ] as IRole[]),
    children: generateRoutes(adminSidebarItems),
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegistrationPage,
  },
  {
    path: "/payment/success",
    Component: Success,
  },
  {
    path: "/payment/fail",
    Component: Failed,
  },
  {
    path: "/payment/cancel",
    Component: Cancelled,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
