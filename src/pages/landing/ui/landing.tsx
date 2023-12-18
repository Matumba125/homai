import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import style from "./landing.module.scss";
import { useNavigate } from "react-router";
import { path } from "../../../app/path";

const Landing = () => {
  const { t } = useTranslation(["landing"]);
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate(`${path.login}?redirectTo=/`);
  };

  return (
    <div className={style.landingContainer}>
      <Button onClick={onLoginClick}>{t("login")}</Button>
    </div>
  );
};

export default Landing;
