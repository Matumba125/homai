import React, { ChangeEvent, useEffect, useState } from "react";
import CreateLessonInputModule from "./create-lesson-input-module/create-lesson-input-module";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassLoading,
  getCreateLessonData,
  getWrongWords,
} from "../../../../app/store/selectors";
import { AppDispatch } from "../../../../app/store/store";
import {
  createLessonThunk,
  fetchLessonByIdThunk,
  getCreateLessonSentences,
  getCreateLessonWords,
  setCreateLessonTheme,
} from "../../bll/lessonsReducer";
import style from "./create-lesson.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { path } from "../../../../app/path";
import CheckmarkRow from "./checkmark-row/checkmark-row";

type CreateLessonParams = {
  lessonId: string;
  classId: string;
};

const CreateLesson = () => {
  const { theme, reading, poem, words, sentences } =
    useSelector(getCreateLessonData);
  const lessonLoading = useSelector(getClassLoading);
  const wrongWords = useSelector(getWrongWords);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lessonId, classId } = useParams<CreateLessonParams>();

  const { t } = useTranslation(["classroom"]);

  const [themeValue, setThemeValue] = useState<string>();
  const [wordsValue, setWordsValue] = useState<string>();
  const [sentencesValue, setSentencesValue] = useState<string>();
  const [poemValue, setPoemValue] = useState<string>();
  const [readingValue, setReadingValue] = useState<string>();

  // New local state and handlers for inputs
  const [checkmark1, setCheckmark1] = useState<boolean>(false);
  const [checkmark2, setCheckmark2] = useState<boolean>(false);
  const [checkmark3, setCheckmark3] = useState<boolean>(false);
  const [wordsNumber, setWordsNumber] = useState<number>(10);
  const [sentencesNumber, setSentencesNumber] = useState<number>(10);
  const [listeningNumber, setListeningNumber] = useState<number>(10);

  const onWordsGenerateClick = () => {
    dispatch(getCreateLessonWords({ existingWords: wordsValue }));
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

  // New handlers for checkmarks and number inputs
  const handleCheckmark1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckmark1(event.target.checked);
  };

  const handleCheckmark2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckmark2(event.target.checked);
  };

  const handleCheckmark3Change = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckmark3(event.target.checked);
  };

  const handleWordsNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordsNumber(Number(event.target.value));
  };

  const handleSentencesNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setSentencesNumber(Number(event.target.value));
  };

  const handleListeningNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setListeningNumber(Number(event.target.value));
  };

  useEffect(() => {
    if (lessonId && classId) {
      dispatch(
        fetchLessonByIdThunk({ lessonId: +lessonId, classId: +classId }),
      );
    }
  }, []);

  useEffect(() => {
    if (theme && theme.length > 0 && !themeValue) {
      setThemeValue(theme);
    }
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
    if (lessonId && classId) {
      dispatch(createLessonThunk({ lessonId: +lessonId, classId: +classId }))
        .unwrap()
        .then(() => navigate(`${path.lessonsList}/${classId}`));
    } else {
      dispatch(createLessonThunk({}))
        .unwrap()
        .then(() => navigate("/"));
    }
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
        disabled={lessonLoading}
      />
      {wrongWords && (
        <div>
          <span>{wrongWords}</span>
        </div>
      )}
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

      <div className={style.checkmarkRow}>
        <CheckmarkRow
          checkmarkValue={checkmark1}
          handleCheckmarkChange={handleCheckmark1Change}
          inputValue={wordsNumber}
          handleInputValueChange={handleWordsNumberChange}
          label={t("correspondence-game")}
          isDisabled={wordsValue?.length === 0}
        />

        <CheckmarkRow
          checkmarkValue={checkmark2}
          handleCheckmarkChange={handleCheckmark2Change}
          inputValue={sentencesNumber}
          handleInputValueChange={handleSentencesNumberChange}
          label={t("sentence-game")}
          isDisabled={sentencesValue?.length === 0}
        />

        <CheckmarkRow
          checkmarkValue={checkmark3}
          handleCheckmarkChange={handleCheckmark3Change}
          inputValue={listeningNumber}
          handleInputValueChange={handleListeningNumberChange}
          label={t("speaking-game")}
          isDisabled={wordsValue?.length === 0}
        />
      </div>

      <div className={style.buttonWrapper}>
        <Button onClick={onCreateLessonClick}>{t("create-lesson")}</Button>
      </div>
    </div>
  );
};

export default CreateLesson;
