import style from "./lesson-menu.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import GamePreview from "./game-preview/game-preview";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessonMenu,
  getLessonMenuError,
} from "../../../app/store/selectors";
import { useEffect } from "react";
import { AppDispatch } from "../../../app/store/store";
import { fetchLessonMenu } from "../bll/lessonReducer";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";

const LessonMenu = () => {
  useCheckStudentRole();
  const { t } = useTranslation(["landing"]);
  const navigate = useNavigate();
  const lessonMenu = useSelector(getLessonMenu);
  const error = useSelector(getLessonMenuError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (lessonMenu.id) {
      dispatch(fetchLessonMenu(lessonMenu.id));
    }
  }, []);

  const onMenuItemClick = (task: string) => {
    navigate(`/${task}`);
  };

  return (
    <div className={style.container}>
      <div className={style.navContainer}>
        {error && <div>{error}</div>}
        {!error &&
          lessonMenu.tasks?.map((task, index) => {
            return (
              <GamePreview
                onClick={() => onMenuItemClick(task)}
                title={t(task)}
                backgroundColor={index % 2 === 0 ? "#4137EE" : "#FF6668"}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LessonMenu;
