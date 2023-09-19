import React from "react";
import style from "./header.module.scss";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../app/store/selectors";
import { useTranslation } from "react-i18next";
import homaiLogo from "../../shared/assets/img/homaiLogo.png";
import { useNavigate } from "react-router";
import { path } from "../../app/path";

const Header = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate(path.login);
  };

  const onSignUpClick = () => {
    navigate(path.login);
  };

  return (
    <header className={style.header} id={"header"}>
      <img alt={"homaiLogo"} src={homaiLogo} />
      {!isLoggedIn && (
        <div className={style.headerControls}>
          <Button variant={"contained"} onClick={onSignInClick}>
            {t("sign-in")}
          </Button>
          <Button variant={"contained"} onClick={onSignUpClick}>
            {t("sign-up")}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
