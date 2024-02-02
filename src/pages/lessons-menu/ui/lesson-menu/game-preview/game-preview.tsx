import React, { FC } from "react";
import style from "../../lesson-menu.module.scss";
import navImg from "../../../../../shared/assets/img/navImg.svg";
import { useTranslation } from "react-i18next";

export type GamePreviewProps = {
  onClick: () => void;
  title: string;
  backgroundColor: string;
  maxScore?: number;
  currentScore?: number;
};

const GamePreview: FC<GamePreviewProps> = ({
  onClick,
  title,
  backgroundColor,
  maxScore,
  currentScore,
}) => {
  const { t } = useTranslation(["landing"]);

  return (
    <div
      onClick={onClick}
      className={style.navImgWrapper}
      style={{
        backgroundColor: backgroundColor,
        justifyContent:
          title === "Poem" || title === "Read" ? "center" : "flex-start",
      }}
    >
      <h3 className={style.navImgTitle}>{t(title.toLowerCase())}</h3>
      {maxScore && (
        <h3 className={style.navImgTitle}>{`${
          currentScore ? currentScore : 0
        }/${maxScore}`}</h3>
      )}
      <img alt={"navImg"} src={navImg} className={style.navImg} />
    </div>
  );
};

export default GamePreview;
