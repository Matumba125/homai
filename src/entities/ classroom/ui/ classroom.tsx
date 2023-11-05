import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesList } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchClassesList } from "../bll/ classroomReducer";
import { path } from "../../../app/path";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import style from "./classroom.module.scss";
import { Link } from "react-router-dom";
import AddClassModal from "./add-class-modal/add-class-modal";

const Classroom = () => {
  const classes = useSelector(getClassesList);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(["classroom"]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchClassesList());
  }, []);

  const handleOpenModalChange = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div className={style.container}>
      <AddClassModal open={openModal} handleClose={handleOpenModalChange} />
      <h2>{t("class-list")}</h2>
      <div className={style.classesList}>
        {classes.map((m) => {
          return <Link to={`${path.editClass}/${m.id}`}>{m.title}</Link>;
        })}
      </div>
      <Button onClick={handleOpenModalChange}>{t("add-class")}</Button>
    </div>
  );
};

export default Classroom;
