import React, { ChangeEvent, FC, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import style from "../classroom.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store/store";
import { addClassThunk } from "../../bll/ classroomReducer";

type AddClassProps = {
  open: boolean;
  handleClose: () => void;
};

const AddClassModal: FC<AddClassProps> = ({ open, handleClose }) => {
  const { t } = useTranslation(["classroom"]);
  const dispatch = useDispatch<AppDispatch>();

  const [classTitle, setClassTitle] = useState<string>("");
  const [studentsList, setStudentsList] = useState<string>("");

  const handleClassTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClassTitle(event.target.value);
  };

  const handleStudentsListChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setStudentsList(event.target.value);
  };

  const handleAddClick = () => {
    dispatch(addClassThunk({ title: classTitle, studentsList }));
    handleClose();
  };

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={open}
      onClose={handleClose}
    >
      <div className={style.modalContainer}>
        <div>
          <h2>{t("class")}</h2>
          <input onChange={handleClassTitleChange} value={classTitle} />
        </div>
        <div>
          <h2>{t("students-list")}</h2>
          <textarea onChange={handleStudentsListChange} value={studentsList} />
        </div>
        <Button onClick={handleAddClick}>{t("add-class")}</Button>
      </div>
    </Modal>
  );
};

export default AddClassModal;
