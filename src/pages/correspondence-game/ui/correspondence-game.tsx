import React, { useEffect, useRef, useState } from "react";
import {
  getAvailableCorrespondenceTasks,
  getCorrespondenceCurrentScore,
  getCorrespondenceMaxScore,
  getCorrespondenceTasks,
  getCurrentLessonId,
} from "../../../app/store/selectors";
import { useSelector } from "react-redux";
import {
  fetchCorrespondenceTasks,
  removeAvailableCorrespondenceTasks,
} from "../bll/correspondenceReducer";
import { useAppDispatch } from "../../../app/store/store";
import style from "./correspondence-game.module.scss";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";
import winSound from "../../../shared/sound/win-sound.mp3";
import loseSound from "../../../shared/sound/lose-sound.mp3";
import { shuffleArray } from "../../../shared/utilities/shuffleArray";
import speakerSvg from "../../../shared/assets/img/speaker.svg";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";
import { CorrespondenceTaskType, Games } from "app/api/api";
import { useCheckLessonId } from "../../../shared/utilities/checkLessonIdAvailable";
import { useNavigate } from "react-router";

const CorrespondenceGame = () => {
  useCheckStudentRole();
  const { t } = useTranslation(["common"]);
  const tasks = useSelector(getCorrespondenceTasks);
  const availableTasks = useSelector(getAvailableCorrespondenceTasks);
  const maxScore = useSelector(getCorrespondenceMaxScore);
  const currentScore = useSelector(getCorrespondenceCurrentScore);
  const lessonId = useSelector(getCurrentLessonId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useCheckLessonId();

  const [taskBundle, setTaskBundle] = useState<CorrespondenceTaskType[]>([]);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [randomItem, setRandomItem] = useState<CorrespondenceTaskType>();
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);
  const taskSoundRef = useRef<HTMLAudioElement>();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const selectedElement = useRef<HTMLElement | null>(null);
  const [currentScoreCounter, setCurrentScoreCounter] = useState<number>(
    currentScore || 0,
  );

  useEffect(() => {
    dispatch(fetchCorrespondenceTasks());
  }, []); //eslint-disable-line;

  useEffect(() => {
    if (availableTasks.length > 0) {
      const selectedTask =
        availableTasks[Math.floor(Math.random() * availableTasks.length)];
      setRandomItem(selectedTask);
      const newTempArray = shuffleArray([
        ...shuffleArray(
          [...tasks].filter((f) => f.id !== selectedTask.id),
        ).slice(0, 3),
        selectedTask,
      ]);
      setTaskBundle(newTempArray);
      taskSoundRef.current = new Audio(selectedTask.audioUrl);
    }
  }, [tasks]);

  const onImageSelect = async (id: number) => {
    selectedElement.current?.classList.remove(style.correctImg, style.wrongImg);
    if (randomItem && id === randomItem.id) {
      selectedElement.current = document.getElementById(id.toString());
      if (selectedElement.current) {
        selectedElement.current.classList.add(style.correctImg);
      }
      playWinAudio();
      setCanGoForward(true);
      if (isFirstTime && lessonId) {
        setIsFirstTime(false);
        setCurrentScoreCounter((prevState) => prevState + 1);
        await Games.sendGameResult({
          result: true,
          exerciseType: "correspondence",
          lessonId: lessonId,
          item_id: randomItem.id,
        });
      }
    } else {
      selectedElement.current = document.getElementById(id.toString());
      if (selectedElement.current) {
        selectedElement.current.classList.add(style.wrongImg);
      }
      playLoseAudio();
      setCanGoForward(false);
      if (isFirstTime && lessonId && randomItem) {
        await Games.sendGameResult({
          result: false,
          exerciseType: "correspondence",
          lessonId: lessonId,
          item_id: randomItem.id,
        });
      }
      setIsFirstTime(false);
    }
  };

  const onGoForwardClick = () => {
    setTaskBundle([]);
    if (randomItem) {
      dispatch(removeAvailableCorrespondenceTasks([randomItem.id]));
    }
    setCanGoForward(false);
    setIsFirstTime(true);
  };

  const onCompleteClick = async () => {
    navigate(-1);
  };

  const onRestartClick = () => {
    dispatch(fetchCorrespondenceTasks());
  };

  const onSpeakerClick = () => {
    if (taskSoundRef.current && taskSoundRef.current.currentTime > 0) {
      taskSoundRef.current.pause();
      taskSoundRef.current.currentTime = 0;
      return;
    }
    if (randomItem && taskSoundRef.current) {
      taskSoundRef.current.play();
    }
  };

  return (
    <div className={style.container}>
      {taskBundle.length > 0 && (
        <div className={style.gameContainer}>
          {maxScore && (
            <h2>
              {currentScoreCounter}/{maxScore}
            </h2>
          )}
          <div className={style.imgContainer}>
            {taskBundle.map((m) => (
              <div
                key={m.id}
                id={m.id.toString()}
                onClick={() => onImageSelect(m.id)}
              >
                <img alt={"taskImage"} src={m.image} />
              </div>
            ))}
          </div>
          <div className={style.keyword}>
            <span>{randomItem && randomItem.word}</span>
            <div onClick={onSpeakerClick}>
              <img alt={"speaker"} src={speakerSvg} />
            </div>
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
      {taskBundle.length === 0 && (
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

export default CorrespondenceGame;
