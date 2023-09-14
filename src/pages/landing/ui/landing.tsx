import style from "./landing.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { path } from "../../../app/path";
import correspondencePng from "../../../shared/assets/img/correspondence.png";
import GamePreview from "./game-preview/game-preview";

const Landing = () => {
  const { t } = useTranslation(["landing"]);
  const navigate = useNavigate();

  const onStartCorrespondenceClick = () => {
    navigate(path.correspondence);
  };

  const onStartSentenceClick = () => {
    navigate(path.sentence);
  };

  return (
    <div className={style.container}>
      <h1>Homai</h1>
      <div className={style.navContainer}>
        <GamePreview
          onClick={onStartCorrespondenceClick}
          backgroundImage={`url(${correspondencePng})`}
          title={t("start-correspondence-game")}
        />
        <GamePreview
          onClick={onStartSentenceClick}
          backgroundImage={`url(${correspondencePng})`}
          title={t("start-sentence-game")}
        />
      </div>
    </div>
  );
};

export default Landing;
