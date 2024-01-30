import React, { useEffect, useRef } from "react";
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
  const smallAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSmallAudioClick = (smallAudio: string) => {
    const sound = new Audio(smallAudio);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (smallAudioRef.current) {
      smallAudioRef.current.pause(); // Pause previous small audio if exists
      if (smallAudioRef.current.src === sound.src) {
        smallAudioRef.current = null;
        return;
      }
    }
    sound.loop = true; // Set audio to loop
    sound.play();
    smallAudioRef.current = sound; // Store reference to current small audio
  };

  const handleAudioClick = (audio: string) => {
    const sound = new Audio(audio);
    if (smallAudioRef.current) {
      smallAudioRef.current.pause();
      smallAudioRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause(); // Pause previous audio if exists
      if (audioRef.current.src === sound.src) {
        audioRef.current = null;
        return;
      }
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
                  className={styles.smallAudioButton}
                  onClick={() => handleSmallAudioClick(part.smallAudio)}
                >
                  <VolumeUpIcon />
                </IconButton>
              </div>
            ))}
            <div className={styles.centerButtonContainer}>
              <IconButton
                className={styles.audioButton}
                onClick={() => handleAudioClick(poem.audio)}
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
