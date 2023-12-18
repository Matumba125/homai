import React, { FC } from "react";
import style from "../../lesson-menu.module.scss";
import navImg from "../../../../../shared/assets/img/navImg.svg";

export type GamePreviewProps = {
  onClick: () => void;
  title: string;
  backgroundColor: string;
};

const GamePreview: FC<GamePreviewProps> = ({
  onClick,
  title,
  backgroundColor,
}) => {
  return (
    <div
      onClick={onClick}
      className={style.navImgWrapper}
      style={{ backgroundColor: backgroundColor }}
    >
      <h3 className={style.navImgTitle}>{title}</h3>
      <img alt={"navImg"} src={navImg} className={style.navImg} />
    </div>
  );
};

export default GamePreview;
