import style from "./landing.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { path } from "../../../app/path";
import GamePreview from "./game-preview/game-preview";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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

  const onCreateLessonClick = () => {
    navigate(path.createLesson);
  };

  return (
    <div className={style.container}>
      <ControlPointIcon
        className={style.navCreateLesson}
        onClick={onCreateLessonClick}
      />
      <div className={style.navContainer}>
        <GamePreview
          onClick={onStartCorrespondenceClick}
          title={t("start-correspondence-game")}
          backgroundColor={"#4137EE"}
        />
        <GamePreview
          onClick={onStartSentenceClick}
          title={t("start-sentence-game")}
          backgroundColor={"#FF6668"}
        />
        <GamePreview
          onClick={onStartSpeakingClick}
          title={t("start-speaking-game")}
          backgroundColor={"#4137EE"}
        />
      </div>
    </div>
  );
};

export default Landing;
