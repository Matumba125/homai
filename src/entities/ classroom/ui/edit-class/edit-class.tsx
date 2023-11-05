import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store/store";
import { fetchClass } from "../../bll/ classroomReducer";
import { getClass } from "../../../../app/store/selectors";
import { useTranslation } from "react-i18next";
import style from "../classroom.module.scss";

type EditClassParams = {
  id: string;
};

const EditClass = () => {
  const { id } = useParams<EditClassParams>();
  const dispatch = useDispatch<AppDispatch>();
  const currentClass = useSelector(getClass);
  const { t } = useTranslation(["classroom"]);

  useEffect(() => {
    if (id) {
      dispatch(fetchClass(+id));
    }
  }, []);

  return (
    <div className={style.editClassContainer}>
      <div className={style.classTitleWrapper}>
        <h2>{t("class")}</h2>
        <h2>{currentClass?.title}</h2>
      </div>
      <div className={style.studentsListTitle}>
        <h2>{t("students-list")}</h2>
        <Button>{t("get-all-passwords")}</Button>
      </div>
      <div className={style.studentsListWrapper}>
        {currentClass &&
          currentClass.studentsList.map((m, index) => {
            return (
              <div className={style.studentsListItem}>
                <span>
                  {index + 1}. {m.name}
                </span>
                <Button>{t("edit")}</Button>
                <Button>{t("delete")}</Button>
                <Button>{t("get-password")}</Button>
              </div>
            );
          })}
      </div>
      <div>
        <h2>{t("add-students")}</h2>
        <textarea />
      </div>
      <Button>{t("add-class")}</Button>
    </div>
  );
};

export default EditClass;
