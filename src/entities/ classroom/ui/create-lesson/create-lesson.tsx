import React, { ChangeEvent, useEffect, useState } from "react";
import CreateLessonInputModule from "./create-lesson-input-module/create-lesson-input-module";
import { useDispatch, useSelector } from "react-redux";
import {
  getClass,
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
  setCreateLessonDate,
  setCreateLessonPoem,
  setCreateLessonReading,
  setCreateLessonSentences,
  setCreateLessonTheme,
  setCreateLessonWords,
} from "../../bll/lessonsReducer";
import style from "./create-lesson.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { path } from "../../../../app/path";
import CheckmarkRow from "./checkmark-row/checkmark-row";
import { useCheckTeacherRole } from "../../../../shared/utilities/checkUserRole";
import { EnabledTask } from "../../../../app/api/api";

type CreateLessonParams = {
  lessonId: string;
};

const CreateLesson = () => {
  useCheckTeacherRole();
  const { theme, reading, poem, words, sentences } =
    useSelector(getCreateLessonData);
  const lessonLoading = useSelector(getClassLoading);
  const wrongWords = useSelector(getWrongWords);
  const currentClass = useSelector(getClass);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lessonId } = useParams<CreateLessonParams>();

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
  const [enabledTasks, setEnabledTasks] = useState<EnabledTask[]>([]);

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

  const onWordsBlur = () => {
    if (wordsValue) {
      dispatch(setCreateLessonWords(wordsValue));
      setCheckmark1(true);
      setCheckmark3(true);

      // Update enabledTasks array for correspondence and speaking
      setEnabledTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter(
          (task) => task.type !== "correspondence" && task.type !== "speaking",
        );
        return [
          ...updatedTasks,
          { type: "correspondence", maxScore: wordsNumber },
          { type: "speaking", maxScore: listeningNumber },
        ];
      });
    }
  };

  const onSentencesBlur = () => {
    if (sentencesValue) {
      dispatch(setCreateLessonSentences(sentencesValue));
      setCheckmark2(true);

      // Update enabledTasks array for sentence
      setEnabledTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter(
          (task) => task.type !== "sentence",
        );
        return [
          ...updatedTasks,
          { type: "sentence", maxScore: sentencesNumber },
        ];
      });
    }
  };

  const onPoemBlur = () => {
    if (poemValue) {
      dispatch(setCreateLessonPoem(poemValue));
    }
  };
  const onReadingBlur = () => {
    if (readingValue) {
      dispatch(setCreateLessonReading(readingValue));
    }
  };

  // New handlers for checkmarks and number inputs
  const handleCheckmark1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckmark1(isChecked);

    if (isChecked) {
      setEnabledTasks((prevTasks) => [
        ...prevTasks,
        { type: "correspondence", maxScore: wordsNumber },
      ]);
    } else {
      setEnabledTasks((prevTasks) =>
        prevTasks.filter((task) => task.type !== "correspondence"),
      );
    }
  };

  const handleWordsNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newWordsNumber = Number(event.target.value);
    setWordsNumber(newWordsNumber);

    if (checkmark1) {
      setEnabledTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.type === "correspondence"
            ? { ...task, maxScore: newWordsNumber }
            : task,
        ),
      );
    }
  };

  const handleCheckmark2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckmark2(isChecked);

    if (isChecked) {
      setEnabledTasks((prevTasks) => [
        ...prevTasks,
        { type: "sentence", maxScore: sentencesNumber },
      ]);
    } else {
      setEnabledTasks((prevTasks) =>
        prevTasks.filter((task) => task.type !== "sentence"),
      );
    }
  };

  const handleSentencesNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newSentencesNumber = Number(event.target.value);
    setSentencesNumber(newSentencesNumber);

    if (checkmark2) {
      setEnabledTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.type === "sentence"
            ? { ...task, maxScore: newSentencesNumber }
            : task,
        ),
      );
    }
  };

  const handleCheckmark3Change = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckmark3(isChecked);

    if (isChecked) {
      setEnabledTasks((prevTasks) => [
        ...prevTasks,
        { type: "speaking", maxScore: listeningNumber },
      ]);
    } else {
      setEnabledTasks((prevTasks) =>
        prevTasks.filter((task) => task.type !== "speaking"),
      );
    }
  };

  const handleListeningNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newListeningNumber = Number(event.target.value);
    setListeningNumber(newListeningNumber);

    if (checkmark3) {
      setEnabledTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.type === "speaking"
            ? { ...task, maxScore: newListeningNumber }
            : task,
        ),
      );
    }
  };

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLessonByIdThunk({ lessonId: +lessonId }));
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
    if (currentClass) {
      dispatch(
        createLessonThunk({
          lessonId: lessonId ? +lessonId : undefined,
          classId: currentClass.id,
          enabledTasks: enabledTasks,
        }),
      )
        .unwrap()
        .then(() => navigate(`${path.lessonsList}/${currentClass.id}`));
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateLessonDate(new Date(e.target.value));
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
      <div className={style.themeWrapper}>
        <h2>{t("date")}</h2>
        <input
          type="date"
          name="dateofbirth"
          id="dateofbirth"
          onChange={handleDateChange}
        />
      </div>
      <CreateLessonInputModule
        onClick={onWordsGenerateClick}
        text={wordsValue}
        setValue={setWordsValue}
        onBlur={onWordsBlur}
        generative
        title={t("words-to-learn")}
        disabled={lessonLoading}
      />
      {wrongWords && (
        <div>
          {t("wrong-words")}:{" "}
          <span className={style.wrongWords}>{wrongWords}</span>
        </div>
      )}
      <CreateLessonInputModule
        onClick={onSentencesGenerateClick}
        text={sentencesValue}
        setValue={setSentencesValue}
        onBlur={onSentencesBlur}
        generative
        title={t("sentences-to-learn")}
      />
      <CreateLessonInputModule
        onClick={() => {}}
        text={poemValue}
        setValue={setPoemValue}
        onBlur={onPoemBlur}
        title={t("poem-to-learn")}
      />
      <CreateLessonInputModule
        onClick={() => {}}
        text={readingValue}
        setValue={setReadingValue}
        onBlur={onReadingBlur}
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
        <Button onClick={onCreateLessonClick}>
          {t(lessonId ? "save" : "create-lesson")}
        </Button>
      </div>
    </div>
  );
};

export default CreateLesson;
