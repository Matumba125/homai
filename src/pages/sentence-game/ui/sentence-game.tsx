import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
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
  restartSentenceTest,
  SentenceTaskType,
} from "../bll/sentenceReducer";
import style from "./sentence-game.module.scss";
import { Button } from "@mui/material";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";

const SentenceGame = () => {
  useCheckStudentRole();
  const { t } = useTranslation(["common"]);
  const tasks = useSelector(getSentenceTasks);
  const isLoading = useSelector(getSentenceTasksLoading);
  const dispatch = useAppDispatch();

  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const [resultArray, setResultArray] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<SentenceTaskType>();
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);

  useEffect(() => {
    dispatch(fetchSentenceTasks());
  }, []); //eslint-disable-line;

  useEffect(() => {
    if (tasks.length > 0) {
      const newTask = shuffleArray([...tasks])[0];
      setSelectedTask(newTask);
      setShuffledArray(shuffleArray(newTask.sentence.split(" ")));
    }
  }, [tasks]);

  const onShuffledArrayItemClick = (e: string) => {
    const tempShuffledArray = [...shuffledArray].filter((el) => el !== e);
    setShuffledArray(tempShuffledArray);
    const tempResultArray = [...resultArray];
    tempResultArray.push(e);
    setResultArray(tempResultArray);
    console.log(tempShuffledArray);
    if (tempShuffledArray.length === 0 && selectedTask) {
      console.log(tempResultArray.join(" "));
      if (tempResultArray.join(" ") === selectedTask.sentence) {
        playWinAudio();
        setCanGoForward(true);
      } else {
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
    }
  };

  const onRestartClick = () => {
    dispatch(restartSentenceTest());
  };

  return (
    <div className={style.container}>
      {tasks.length > 0 && (
        <div className={style.gameContainer}>
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
      {tasks.length === 0 && !isLoading && (
        <div className={style.gameContainer}>
          <div className={style.buttonsContainer}>
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
