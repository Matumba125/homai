import React, { useEffect, useRef, useState } from "react";
import {
  getCorrespondenceTasks,
  getCurrentLessonId,
} from "../../../app/store/selectors";
import { useSelector } from "react-redux";
import {
  fetchCorrespondenceTasks,
  removeAvailableCorrespondenceTasks,
  restartCorrespondenceTest,
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
  const lessonId = useSelector(getCurrentLessonId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useCheckLessonId();

  const [taskBundle, setTaskBundle] = useState<CorrespondenceTaskType[]>([]);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [randomItem, setRandomItem] = useState<CorrespondenceTaskType>();
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);
  const [selectedCorrectly, setSelectedCorrectly] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const selectedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(fetchCorrespondenceTasks());
  }, []); //eslint-disable-line;

  useEffect(() => {
    if (tasks.length > 0) {
      const newTempArray = shuffleArray([...tasks]).slice(0, 4);
      setRandomItem(
        newTempArray[Math.floor(Math.random() * newTempArray.length)],
      );
      setTaskBundle(newTempArray);
    }
  }, [tasks]);

  const onImageSelect = (id: number) => {
    selectedElement.current?.classList.remove(style.correctImg, style.wrongImg);
    if (randomItem && id === randomItem.id) {
      selectedElement.current = document.getElementById(id.toString());
      if (selectedElement.current) {
        selectedElement.current.classList.add(style.correctImg);
      }
      playWinAudio();
      setCanGoForward(true);
      if (!selectedCorrectly) {
        setCounter((prevCounter) => prevCounter + 1);
        setSelectedCorrectly(true);
      }
    } else {
      selectedElement.current = document.getElementById(id.toString());
      if (selectedElement.current) {
        selectedElement.current.classList.add(style.wrongImg);
      }
      playLoseAudio();
      setCanGoForward(false);
      setSelectedCorrectly(false);
    }
  };

  const onGoForwardClick = () => {
    setTaskBundle([]);
    dispatch(removeAvailableCorrespondenceTasks(taskBundle.map((m) => m.id)));
    setCanGoForward(false);
    setSelectedCorrectly(false); // Reset selectedCorrectly state
  };

  const onCompleteClick = async () => {
    if (lessonId) {
      try {
        await Games.sendCorrespondenceResult(counter, lessonId);
      } catch (e) {
        console.error(e);
      } finally {
        setCounter(0);
        navigate(-1);
      }
    }
  };

  const onRestartClick = () => {
    dispatch(restartCorrespondenceTest());
    setCounter(0);
  };

  const onSpeakerClick = () => {
    playWinAudio();
  };

  return (
    <div className={style.container}>
      {taskBundle.length > 0 && (
        <div className={style.gameContainer}>
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
