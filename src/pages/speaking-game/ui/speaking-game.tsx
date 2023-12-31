import { Games } from "app/api/api";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getSpeakingTasks,
  getSpeakingTasksLoading,
} from "../../../app/store/selectors";
import { useAppDispatch } from "../../../app/store/store";
import useSound from "use-sound";
import winSound from "../../../shared/sound/win-sound.mp3";
import loseSound from "../../../shared/sound/lose-sound.mp3";
import { shuffleArray } from "../../../shared/utilities/shuffleArray";
import {
  fetchSpeakingTasks,
  removeAvailableSpeakingTasks,
  restartSpeakingTest,
  SpeakingTaskType,
} from "../bll/speakingReducer";
import style from "./speaking-game.module.scss";
import { Button } from "@mui/material";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";

const SpeakingGame = () => {
  useCheckStudentRole();
  const [recording, setRecording] = useState<boolean>(false);
  const { t } = useTranslation(["common"]);
  const tasks = useSelector(getSpeakingTasks);
  const isLoading = useSelector(getSpeakingTasksLoading);
  const dispatch = useAppDispatch();

  const [selectedTask, setSelectedTask] = useState<SpeakingTaskType>();
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [playWinAudio] = useSound(winSound);
  const [playLoseAudio] = useSound(loseSound);

  useEffect(() => {
    dispatch(fetchSpeakingTasks());
  }, []); //eslint-disable-line;

  useEffect(() => {
    if (tasks.length > 0) {
      const newTask = shuffleArray([...tasks])[0];
      setSelectedTask(newTask);
    }
  }, [tasks]);

  const mediaRecorder = useRef<MediaRecorder>();
  let chunks: any[] = [];

  async function initMedia() {
    const audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext.createMediaStreamSource(stream);

    const media = new MediaRecorder(stream);

    mediaRecorder.current = media;

    mediaRecorder.current.ondataavailable = async (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.current.onstop = async (e) => {
      if (selectedTask) {
        const recording = new Blob(chunks, { type: "audio/ogg" });

        const formData = new FormData();
        formData.append("correct_text", selectedTask.text);
        formData.append("audio", recording, "atai.ogg");

        const res = await Games.sendSpeakingAnswer(formData);
        debugger;
        if (res.data.result === "OK") {
          playWinAudio();
          setCanGoForward(true);
        } else {
          playLoseAudio();
        }
      }
    };
  }

  const onRecordStartClick = async () => {
    setRecording(true);
    await initMedia();
    if (mediaRecorder.current) {
      mediaRecorder.current.start();
    }
  };

  const onRecordStopClick = async () => {
    if (mediaRecorder.current) {
      setRecording(false);
      mediaRecorder.current.stop();
    }
  };

  const onGoForwardClick = () => {
    if (selectedTask) {
      dispatch(removeAvailableSpeakingTasks(selectedTask.id));
      setSelectedTask(undefined);
      setCanGoForward(false);
    }
  };

  const onRestartClick = () => {
    dispatch(restartSpeakingTest());
  };

  return (
    <div className={style.container}>
      {tasks.length > 0 && (
        <div className={style.gameContainer}>
          <div className={style.gameBody}>
            <h2>{selectedTask && selectedTask.text}</h2>
            <Button
              onClick={!recording ? onRecordStartClick : onRecordStopClick}
              variant={"contained"}
              className={recording ? style.stopRecordBtn : style.startRecordBtn}
            >
              {t(`${recording ? "stop-record" : "start-record"}`)}
            </Button>
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

export default SpeakingGame;
