import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./poem-style.module.scss";
import { getPoem } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchPoem } from "../bll/poemReducer";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const PoemReading = () => {
  const dispatch = useDispatch<AppDispatch>();
  const poem = useSelector(getPoem);

  const handleSmallAudioClick = (smallAudio: string) => {
    let sound = new Audio(smallAudio);
    sound.play();
  };

  const handleAudioClick = (audio: string) => {
    let sound = new Audio(audio);
    sound.play();
  };

  useEffect(() => {
    dispatch(fetchPoem(1));
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
