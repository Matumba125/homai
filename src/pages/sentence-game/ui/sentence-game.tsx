import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getCurrentLessonId,
  getSentenceTasks,
  getSentenceTasksLoading,
} from "../../../app/store/selectors";
import { useAppDispatch } from "../../../app/store/store";
import useSound from "use-sound";
import winSound from "../../../shared/sound/win-sound.mp3";
import loseSound from "../../../shared/sound/lose-sound.mp3";
import { shuffleArray } from "../../../shared/utilities/shuffleArray";
import {
  fetchSentenceTasks,
  removeAvailableSentenceTasks,
} from "../bll/sentenceReducer";
import style from "./sentence-game.module.scss";
import { Button } from "@mui/material";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";
import { useCheckLessonId } from "../../../shared/utilities/checkLessonIdAvailable";
import { Games, SentenceTaskType } from "app/api/api";
import { useNavigate } from "react-router";

const SentenceGame = () => {
  useCheckStudentRole();
  const { t } = useTranslation(["common"]);
  const { maxScore, currentScore, availableTasks } =
    useSelector(getSentenceTasks);
  const isLoading = useSelector(getSentenceTasksLoading);
  const lessonId = useSelector(getCurrentLessonId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useCheckLessonId();

  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const [resultArray, setResultArray] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<SentenceTaskType>();
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [currentScoreCounter, setCurrentScoreCounter] = useState<number>(0);
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchSentenceTasks());
  }, []); //eslint-disable-line;

  useEffect(() => {
    if (availableTasks.length > 0) {
      const newTask = shuffleArray([...availableTasks])[0];
      setSelectedTask(newTask);
      setShuffledArray(shuffleArray(newTask.sentence.split(" ")));
    }
  }, [availableTasks]);

  useEffect(() => {
    if (currentScore) {
      setCurrentScoreCounter(currentScore);
    }
  }, [currentScore]);

  const onShuffledArrayItemClick = async (e: string) => {
    const tempShuffledArray = [...shuffledArray].filter((el) => el !== e);
    setShuffledArray(tempShuffledArray);
    const tempResultArray = [...resultArray];
    tempResultArray.push(e);
    setResultArray(tempResultArray);
    if (tempShuffledArray.length === 0 && selectedTask) {
      if (tempResultArray.join(" ") === selectedTask.sentence) {
        playWinAudio();
        setCanGoForward(true);
        if (isFirstTime && lessonId) {
          setIsFirstTime(false);
          setCurrentScoreCounter((prevState) => prevState + 1);
          await Games.sendGameResult({
            result: true,
            exerciseType: "sentence",
            lessonId: lessonId,
            item_id: selectedTask.id,
          });
        }
      } else {
        if (isFirstTime && lessonId) {
          await Games.sendGameResult({
            result: true,
            exerciseType: "sentence",
            lessonId: lessonId,
            item_id: selectedTask.id,
          });
        }
        setIsFirstTime(false);
        playLoseAudio();
      }
    }
  };

  const onResultArrayItemClick = (e: string) => {
    if (!canGoForward) {
      setResultArray([...resultArray].filter((el) => el !== e));
      const tempShuffledArray = [...shuffledArray];
      tempShuffledArray.push(e);
      setShuffledArray(tempShuffledArray);
    }
  };

  const onGoForwardClick = () => {
    if (selectedTask) {
      dispatch(removeAvailableSentenceTasks(selectedTask.id));
      setShuffledArray([]);
      setSelectedTask(undefined);
      setResultArray([]);
      setCanGoForward(false);
      setIsFirstTime(true);
    }
  };

  const onCompleteClick = async () => {
    navigate(-1);
  };

  const onRestartClick = () => {
    dispatch(fetchSentenceTasks());
  };

  return (
    <div className={style.container}>
      {availableTasks.length > 0 && (
        <div className={style.gameContainer}>
          <h2>{`${currentScoreCounter}/${maxScore}`}</h2>
          <div className={style.resultContainer}>
            {resultArray.map((resItem) => (
              <div
                key={resItem}
                onClick={() => onResultArrayItemClick(resItem)}
              >
                <span>{resItem}</span>
              </div>
            ))}
          </div>
          <div className={style.shuffledContainer}>
            {shuffledArray.map((shuffledItem) => (
              <div
                key={shuffledItem}
                onClick={() => onShuffledArrayItemClick(shuffledItem)}
              >
                <span>{shuffledItem}</span>
              </div>
            ))}
          </div>
          <div className={style.buttonsContainer}>
            <Button
              variant={"contained"}
              disabled={!canGoForward}
              onClick={onGoForwardClick}
            >
              {t("next")}
            </Button>
          </div>
        </div>
      )}
      {availableTasks.length === 0 && !isLoading && (
        <div className={style.gameContainer}>
          <div className={style.buttonsContainer}>
            <Button onClick={onCompleteClick} variant={"contained"}>
              {t("complete")}
            </Button>
            <Button onClick={onRestartClick} variant={"contained"}>
              {t("restart")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentenceGame;
