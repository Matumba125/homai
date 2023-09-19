import Header from "entities/header/header";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";

export const Root: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
