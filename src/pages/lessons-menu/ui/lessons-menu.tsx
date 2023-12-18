import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonsList } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchLessonsList } from "../bll/lessonReducer";
import style from "./lesson-menu.module.scss";
import { useNavigate } from "react-router";
import { path } from "../../../app/path";
import { useTranslation } from "react-i18next";

const LessonsMenu = () => {
  const lessonsList = useSelector(getLessonsList);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    dispatch(fetchLessonsList());
  }, []);

  const onLessonClick = (id: number) => {
    navigate(`${path.lesson}/${id}`);
  };

  return (
    <div className={style.container}>
      <h2>{t("lessons-list")}</h2>
      <div className={style.lessonListWrapper}>
        {lessonsList.map((lesson) => {
          return (
            <div onClick={() => onLessonClick(lesson.id)}>{lesson.title}</div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsMenu;
