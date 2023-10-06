import { Button } from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import style from "../create-lesson.module.scss";
import { useTranslation } from "react-i18next";

type CreateLessonInputModuleProps = {
  onClick: () => void;
  text?: string;
  setValue: (data: string) => void;
  generative?: boolean;
  title: string;
};

const CreateLessonInputModule: FC<CreateLessonInputModuleProps> = ({
  onClick,
  text,
  setValue,
  generative,
  title,
}) => {
  const { t } = useTranslation(["teacherRoom"]);

  const onTextareaValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={style.inputModuleWrapper}>
      <h2>{title}</h2>
      <div>
        <textarea value={text} onChange={onTextareaValueChange} />
        {generative && <Button onClick={onClick}>{t("generate")}</Button>}
      </div>
    </div>
  );
};

export default CreateLessonInputModule;
