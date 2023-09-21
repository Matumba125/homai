import React from "react";
import style from "./header.module.scss";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUserData } from "../../app/store/selectors";
import { useTranslation } from "react-i18next";
import homaiLogo from "../../shared/assets/img/homaiLogo.png";
import { useNavigate } from "react-router";
import { path } from "../../app/path";
import { Avatar } from "shared/ui/avatar";

const Header = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUserData);
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate(path.login);
  };

  const onSignUpClick = () => {
    navigate(path.login);
  };

  const onUserInfoClick = () => {
    navigate(path.profile);
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
      {isLoggedIn && (
        <div onClick={onUserInfoClick} className={style.userPreview}>
          <Avatar onClick={() => {}} size={"xs"} user={user} />
          <span>{user.username}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
