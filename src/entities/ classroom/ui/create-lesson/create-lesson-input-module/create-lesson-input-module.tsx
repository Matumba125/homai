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
  disabled?: boolean;
  onBlur: () => void;
};

const CreateLessonInputModule: FC<CreateLessonInputModuleProps> = ({
  onClick,
  text,
  setValue,
  generative,
  title,
  disabled,
  onBlur,
}) => {
  const { t } = useTranslation(["classRoom"]);

  const onTextareaValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={style.inputModuleWrapper}>
      <h2>{title}</h2>
      <div>
        <textarea
          disabled={disabled}
          value={text}
          onBlur={onBlur}
          onChange={onTextareaValueChange}
        />
        {generative && (
          <Button disabled={disabled} onClick={onClick}>
            {t("generate")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateLessonInputModule;
