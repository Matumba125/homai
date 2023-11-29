import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store/store";
import { getClass, getLessonResults } from "../../../../app/store/selectors";
import { useTranslation } from "react-i18next";
import { fetchLessonResults } from "../../bll/ classroomReducer";
import style from "../classroom.module.scss";
import ResultCell from "./result-cell/result-cell";

type LessonResultsParams = {
  id: string;
};

const LessonResults = () => {
  const { id } = useParams<LessonResultsParams>();
  const dispatch = useDispatch<AppDispatch>();
  const currentClass = useSelector(getClass);
  const lessonResults = useSelector(getLessonResults);
  const { t } = useTranslation(["classroom"]);

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonResults(+id));
    }
  }, []); //eslint-disable-line

  return (
    <div className={style.editClassContainer}>
      <div className={style.classTitleWrapper}>
        <h2>{t("class")}</h2>
        <div className={style.classTitleEditWrapper}>
          <h2>{currentClass?.title}</h2>
        </div>
      </div>
      <div className={style.studentsListTitle}>
        <h2>{t("students-list")}</h2>
      </div>
      <div className={style.studentsListWrapper}>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>{t("full-name")}</th>
              <th>{t("correspondence-game")}</th>
              <th>{t("sentence-game")}</th>
              <th>{t("speaking-game")}</th>
            </tr>
          </thead>
          <tbody>
            {lessonResults &&
              lessonResults.studentsResults.map((student, index) => (
                <tr key={student.id}>
                  <td className={style.studentIndexWrapper}>{index + 1}</td>
                  <td className={style.studentNameWrapper}>{student.name}</td>
                  <ResultCell
                    maxResult={lessonResults.maxCorrespondenceResult}
                    studentResult={student.correspondenceResult}
                  />
                  <ResultCell
                    maxResult={lessonResults.maxSentenceResult}
                    studentResult={student.sentenceResult}
                  />
                  <ResultCell
                    maxResult={lessonResults.maxSpeakingResult}
                    studentResult={student.speakingResult}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonResults;
