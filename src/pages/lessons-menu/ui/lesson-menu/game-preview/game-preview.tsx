import React, { FC } from "react";
import style from "../../lesson-menu.module.scss";
import navImg from "../../../../../shared/assets/img/navImg.svg";

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
  return (
    <div
      onClick={onClick}
      className={style.navImgWrapper}
      style={{ backgroundColor: backgroundColor }}
    >
      <h3 className={style.navImgTitle}>{title}</h3>
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
