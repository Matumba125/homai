import React, { useEffect } from "react";
import style from "./header.module.scss";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUserData } from "../../app/store/selectors";
import { useTranslation } from "react-i18next";
import homaiLogo from "../../shared/assets/img/logo.svg";
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

  return (
    <header className={style.header} id={"header"}>
      <div className={style.headerTop} id={"headerTop"}>
        <div id={"logo"} className={style.logo}>
          <img alt={"homaiLogo"} src={homaiLogo} />
          <div className={style.logoText}>
            <span>BA</span>
            <span>PUZ</span>
          </div>
        </div>
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
        {isLoggedIn && (
          <div onClick={onUserInfoClick} className={style.userPreview}>
            <Avatar onClick={() => {}} size={"xs"} user={user} />
            <span>{user.username}</span>
          </div>
        )}
      </div>
      {/*<div className={style.headerBottom} />*/}
    </header>
  );
};

export default Header;
