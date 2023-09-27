import React, { useEffect, useState } from "react";
import { getCorrespondenceTasks } from "../../../app/store/selectors";
import { useSelector } from "react-redux";
import {
  CorrespondenceTaskType,
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
import { useNavigate } from "react-router";
import { shuffleArray } from "../../../shared/utilities/shuffleArray";

const CorrespondenceGame = () => {
  const { t } = useTranslation(["common"]);
  const tasks = useSelector(getCorrespondenceTasks);
  const dispatch = useAppDispatch();

  const [taskBundle, setTaskBundle] = useState<CorrespondenceTaskType[]>([]);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [randomItem, setRandomItem] = useState<CorrespondenceTaskType>();
  const navigate = useNavigate();
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);

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
    if (randomItem && id === randomItem.id) {
      playWinAudio();
      setCanGoForward(true);
    } else {
      playLoseAudio();
      setCanGoForward(false);
    }
  };

  const onGoForwardClick = () => {
    setTaskBundle([]);
    dispatch(removeAvailableCorrespondenceTasks(taskBundle.map((m) => m.id)));
    setCanGoForward(false);
  };

  const onRestartClick = () => {
    dispatch(restartCorrespondenceTest());
  };

  const onBackClick = () => {
    onRestartClick();
    navigate(-1);
  };

  return (
    <div className={style.container}>
      {taskBundle.length > 0 && (
        <div className={style.gameContainer}>
          <div className={style.imgContainer}>
            {taskBundle.map((m) => (
              <div id={m.id.toString()} onClick={() => onImageSelect(m.id)}>
                <img alt={"taskImage"} src={m.image} />
              </div>
            ))}
          </div>
          <div className={style.keyword}>{randomItem && randomItem.word}</div>
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
