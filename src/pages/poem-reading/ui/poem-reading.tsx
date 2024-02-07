import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./poem-style.module.scss";
import { getPoem } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchPoem } from "../bll/poemReducer";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";
import { useCheckLessonId } from "../../../shared/utilities/checkLessonIdAvailable";

const PoemReading = () => {
  useCheckStudentRole();
  const dispatch = useDispatch<AppDispatch>();
  const poem = useSelector(getPoem);
  useCheckLessonId();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activePart, setActivePart] = useState<number>();

  const handleSmallAudioClick = (smallAudio: string, id: number) => {
    const sound = new Audio(smallAudio);
    setActivePart(id);
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.src === sound.src) {
        audioRef.current = null;
        setActivePart(undefined);
        return;
      }
      audioRef.current = null;
    }
    sound.loop = true; // Set audio to loop
    sound.play();
    audioRef.current = sound; // Store reference to current small audio
  };

  const handleAudioClick = (audio: string, id: number) => {
    const sound = new Audio(audio);
    setActivePart(id);
    if (audioRef.current) {
      audioRef.current.pause(); // Pause previous audio if exists
      if (audioRef.current.src === sound.src) {
        audioRef.current = null;
        setActivePart(undefined);
        return;
      }
      audioRef.current = null;
    }
    sound.addEventListener("ended", () => {
      sound.currentTime = 0; // Reset audio to start
      sound.play(); // Play audio again when it ends
    });
    sound.play();
    audioRef.current = sound; // Store reference to current audio
  };

  useEffect(() => {
    dispatch(fetchPoem());
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.poemContainer}>
      {poem &&
        poem.map((poem, poemIndex) => (
          <div key={poemIndex} className={styles.poem}>
            {poem.parts.map((part, partIndex) => (
              <div key={partIndex} className={styles.rowWrapper}>
                <div className={styles.rowText}>
                  <p>{part.rowOne}</p>
                  <p>{part.rowTwo}</p>
                </div>
                <IconButton
                  className={
                    activePart === part.id
                      ? styles.activeSmallAudioButton
                      : styles.smallAudioButton
                  }
                  onClick={() =>
                    handleSmallAudioClick(part.smallAudio, part.id)
                  }
                >
                  <VolumeUpIcon />
                </IconButton>
              </div>
            ))}
            <div className={styles.centerButtonContainer}>
              <IconButton
                className={
                  activePart === poem.id
                    ? styles.activeAudioButton
                    : styles.audioButton
                }
                onClick={() => handleAudioClick(poem.audio, poem.id)}
              >
                <VolumeUpIcon />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PoemReading;
