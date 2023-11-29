import { Button, IconButton, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store/store";
import { getClass, getClassLessons } from "../../../../app/store/selectors";
import { useTranslation } from "react-i18next";
import style from "./lessons-list.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import {
  deleteLessonThunk,
  fetchClassLessons,
  LessonType,
} from "../../bll/lessonsReducer";
import { path } from "../../../../app/path";
import { fetchClass } from "../../bll/ classroomReducer";
import { format } from "date-fns";

type LessonsListParams = {
  id: string;
};

const LessonsList = () => {
  const { id } = useParams<LessonsListParams>();
  const dispatch = useDispatch<AppDispatch>();
  const currentClassLessons = useSelector(getClassLessons);
  const currentClass = useSelector(getClass);
  const { t } = useTranslation(["classroom"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchClassLessons(+id));
      dispatch(fetchClass(+id));
    }
  }, []); //eslint-disable-line

  // Local state for modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalLesson, setModalLesson] = useState<LessonType>();

  const handleShare = async (id: number, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleEdit = (id: number) => {
    if (currentClass) {
      navigate(`${path.createLesson}/${id}`);
    }
  };

  const handleOpenDeleteModal = (lesson: LessonType) => {
    setModalLesson(lesson);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteLesson = (lessonId: number) => {
    if (currentClass) {
      dispatch(deleteLessonThunk({ lessonId, classId: currentClass.id }));
      setDeleteModalOpen(false);
    }
  };

  const handleResultsClick = (id: number) => {
    navigate(`${path.lessonResults}/${id}`);
  };

  const onAddLessonClick = () => {
    navigate(path.createLesson);
  };

  return (
    <div className={style.editClassContainer}>
      <div className={style.classTitleWrapper}>
        <h2>{t("class")}</h2>
        <div className={style.classTitleEditWrapper}>
          <h2>{currentClass?.title}</h2>
        </div>
      </div>
      <div className={style.studentsListTitle}>
        <h2>{t("lessons-list")}</h2>
      </div>
      <div className={style.studentsListWrapper}>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>{t("date")}</th>
              <th>{t("lesson-theme")}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentClassLessons &&
              currentClassLessons.length > 0 &&
              currentClassLessons.map((lesson, index) => (
                <tr key={lesson.id}>
                  <td className={style.studentIndexWrapper}>{index + 1}</td>
                  <td className={style.dateWrapper}>
                    {format(lesson.date, "d.MM.Y ")}
                  </td>
                  <td className={style.studentNameWrapper}>
                    <span>{lesson.title}</span>
                  </td>
                  <td>
                    <Button onClick={() => handleResultsClick(lesson.id)}>
                      {t("results")}
                    </Button>
                  </td>
                  <td className={style.buttonsWrapper}>
                    <IconButton
                      onClick={() => handleShare(lesson.id, lesson.link)}
                    >
                      <ShareIcon titleAccess={t("share")} />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(lesson.id)}>
                      <EditIcon titleAccess={t("edit")} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteModal({ ...lesson })}
                    >
                      <DeleteIcon titleAccess={t("delete")} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Button onClick={onAddLessonClick}>{t("add-class")}</Button>
      </div>

      {/* Delete Modal */}
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
      >
        <>
          {modalLesson && (
            <div className={style.modalContainer}>
              <h2>{t("delete-confirmation")}</h2>
              <p>
                {t("are-you-sure-you-want-to-delete-lesson")}{" "}
                {modalLesson.title}?
              </p>
              <Button onClick={handleCloseDeleteModal}>{t("no")}</Button>
              <Button onClick={() => handleDeleteLesson(modalLesson.id)}>
                {t("yes")}
              </Button>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default LessonsList;
