import React, { FC } from "react";
import style from "../landing.module.scss";

export type GamePreviewProps = {
  onClick: () => void;
  backgroundImage: string;
  title: string;
};

const GamePreview: FC<GamePreviewProps> = ({
  onClick,
  backgroundImage,
  title,
}) => {
  return (
    <div onClick={onClick} className={style.navImgWrapper}>
      <div
        className={style.navImg}
        style={{
          backgroundImage: backgroundImage,
          backgroundRepeat: "no-repeat",
        }}
      />
      <h3 className={style.navImgTitle}>{title}</h3>
    </div>
  );
};

export default GamePreview;
