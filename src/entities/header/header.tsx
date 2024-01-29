import React, { useEffect } from "react";
import style from "./header.module.scss";
import homaiLogo from "../../shared/assets/img/logo.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOutThunk } from "../user/bll/userReducer";
import { AppDispatch } from "../../app/store/store";
import { useNavigate } from "react-router";
import { getIsLoggedIn } from "../../app/store/selectors";

const Header = () => {
  /*  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUserData);
  const navigate = useNavigate();*/

  /*  const onSignInClick = () => {
    navigate(path.login);
  };

  const onSignUpClick = () => {
    navigate(path.login);
  };*/

  /*  const onUserInfoClick = () => {
    navigate(path.profile);
  };*/

  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (window.location.pathname !== "/" && window.innerWidth < 768) {
      const logo = document.getElementById("logo");
      const header = document.getElementById("headerTop");
      if (logo && header) {
        logo.classList.add(style.smallLogo);
        header.style.height = "85px";
      }
    }
    if (window.location.pathname === "/") {
      const logo = document.getElementById("logo");
      const header = document.getElementById("headerTop");
      if (logo && header) {
        logo.classList.remove(style.smallLogo);
        header.style.height = "170px";
      }
    }
  }, [window.location.pathname]);

  const onLogoutClick = async () => {
    await dispatch(logOutThunk());
    navigate("/");
  };

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <header className={style.header} id={"header"}>
      <div className={style.headerTop} id={"headerTop"}>
        <div onClick={onLogoClick} id={"logo"} className={style.logo}>
          <img alt={"homaiLogo"} src={homaiLogo} />
          <div className={style.logoText}>
            <span>BA</span>
            <span>PUZ</span>
          </div>
        </div>
        {isLoggedIn && (
          <div className={style.logoutWrapper}>
            <button onClick={onLogoutClick}>{t("log-out")}</button>
          </div>
        )}
        {/*        {!isLoggedIn && (
          <div className={style.headerControls}>
            <Button variant={"contained"} onClick={onSignInClick}>
              {t("sign-in")}
            </Button>
            <Button variant={"contained"} onClick={onSignUpClick}>
              {t("sign-up")}
            </Button>
          </div>
        )}*/}
        {/*        {isLoggedIn && (
          <div onClick={onUserInfoClick} className={style.userPreview}>
            <Avatar onClick={() => {}} size={"xs"} user={user} />
            <span>{user.username}</span>
          </div>
        )}*/}
      </div>
      {/*<div className={style.headerBottom} />*/}
    </header>
  );
};

export default Header;
