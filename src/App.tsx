import React from "react";
import { CommonLayout } from "./components/Layouts/CommonLayout/CommonLayout";
import { Outlet } from "react-router";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
