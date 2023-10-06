import React, { ChangeEvent, useEffect, useState } from "react";
import CreateLessonInputModule from "./create-lesson-input-module/create-lesson-input-module";
import { useDispatch, useSelector } from "react-redux";
import { getCreateLessonData } from "../../../../app/store/selectors";
import { AppDispatch } from "../../../../app/store/store";
import {
  createLessonThunk,
  getCreateLessonSentences,
  getCreateLessonWords,
  setCreateLessonTheme,
} from "../../bll/teacherRoomReducer";
import style from "./create-lesson.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const CreateLesson = () => {
  const { reading, poem, words, sentences } = useSelector(getCreateLessonData);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { t } = useTranslation(["teacherRoom"]);

  const [themeValue, setThemeValue] = useState<string>();
  const [wordsValue, setWordsValue] = useState<string>();
  const [sentencesValue, setSentencesValue] = useState<string>();
  const [poemValue, setPoemValue] = useState<string>();
  const [readingValue, setReadingValue] = useState<string>();

  const onWordsGenerateClick = () => {
    dispatch(getCreateLessonWords());
  };
  const onSentencesGenerateClick = () => {
    dispatch(getCreateLessonSentences());
  };

  const onThemeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeValue(event.target.value);
  };

  const onThemeBlur = () => {
    if (themeValue) {
      dispatch(setCreateLessonTheme(themeValue));
    }
  };

  useEffect(() => {
    if (reading && reading.length > 0 && !readingValue) {
      setReadingValue(reading);
    }
    if (poem && poem.length > 0 && !poemValue) {
      setPoemValue(poem);
    }
    if (words.length > 0) {
      setWordsValue(words);
    }
    if (sentences.length > 0) {
      setSentencesValue(sentences);
    }
  }, [reading, poem, words, sentences]);

  const onCreateLessonClick = () => {
    dispatch(createLessonThunk())
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <div className={style.createLessonWrapper}>
      <div className={style.themeWrapper}>
        <h2>{t("theme")}</h2>
        <input
          value={themeValue}
          onChange={onThemeValueChange}
          onBlur={onThemeBlur}
        />
      </div>
      <CreateLessonInputModule
        onClick={onWordsGenerateClick}
        text={wordsValue}
        setValue={setWordsValue}
        generative
        title={t("words-to-learn")}
      />
      <CreateLessonInputModule
        onClick={onSentencesGenerateClick}
        text={sentencesValue}
        setValue={setSentencesValue}
        generative
        title={t("sentences-to-learn")}
      />
      <CreateLessonInputModule
        onClick={() => {}}
        text={poemValue}
        setValue={setPoemValue}
        title={t("poem-to-learn")}
      />
      <CreateLessonInputModule
        onClick={() => {}}
        text={readingValue}
        setValue={setReadingValue}
        title={t("reading")}
      />
      <div className={style.buttonWrapper}>
        <Button onClick={onCreateLessonClick}>{t("create-lesson")}</Button>
      </div>
    </div>
  );
};

export default CreateLesson;
