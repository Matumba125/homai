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
  const onStartSpeakingClick = () => {
    navigate(path.speaking);
  };

  return (
    <div className={style.container}>
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
        <GamePreview
          onClick={onStartSpeakingClick}
          backgroundImage={`url(${correspondencePng})`}
          title={t("start-speaking-game")}
        />
      </div>
    </div>
  );
};

export default Landing;
