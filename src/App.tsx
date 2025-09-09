import React from "react";
import { CommonLayout } from "./components/Layouts/CommonLayout/CommonLayout";
import { Outlet, ScrollRestoration } from "react-router";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <CommonLayout>
      <ScrollRestoration />
      <Outlet />
    </CommonLayout>
  );
};

export default App;
