import style from "../lesson-menu.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import GamePreview from "./game-preview/game-preview";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getLessonMenu,
  getLessonMenuError,
} from "../../../../app/store/selectors";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../../app/store/store";
import { fetchLessonMenu } from "../../bll/lessonReducer";
import { useCheckStudentRole } from "../../../../shared/utilities/checkUserRole";
import { path } from "../../../../app/path";

type LessonMenuParams = {
  id: string;
};

const LessonMenu = () => {
  useCheckStudentRole();
  const { t } = useTranslation(["landing"]);
  const navigate = useNavigate();
  const error = useSelector(getLessonMenuError);
  const lessonMenu = useSelector(getLessonMenu);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<LessonMenuParams>();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonMenu(+id));
    }
  }, []);

  const onMenuItemClick = (task: string) => {
    navigate(`/${task.toLowerCase()}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const id = setTimeout(() => {
        navigate(`${path.login}?redirectTo=${path.lesson}/${id}`);
      }, 2000);
      setTimeoutId(id);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && (
        <div className={style.container}>
          <div className={style.navContainer}>
            {error && <div>{error}</div>}
            {!error &&
              lessonMenu.tasks?.map((task, index) => {
                return (
                  <GamePreview
                    onClick={() => onMenuItemClick(task)}
                    title={t(task.toLowerCase())}
                    backgroundColor={index % 2 === 0 ? "#4137EE" : "#FF6668"}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default LessonMenu;
