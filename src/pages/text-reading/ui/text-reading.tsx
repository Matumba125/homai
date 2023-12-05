import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReadingText } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchReadingText } from "../bll/textReducer";
import style from "./text-style.module.scss";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";

const ReadingText = () => {
  useCheckStudentRole();
  const [audio, setAudio] = useState(new Audio());
  const [currentAudioMs, setCurrentAudioMs] = useState(0);
  const text = useSelector(getReadingText);
  const dispatch = useDispatch<AppDispatch>();

  const handlePlayAudio = () => {
    if (text) {
      if (audio.paused) {
        // If paused, set the audio source and resume from the current position
        audio.src = text.audio;
        audio.currentTime = currentAudioMs / 1000; // Convert milliseconds to seconds
        audio.play();
      } else {
        // If playing, pause the audio and store the current playback position
        audio.pause();
      }
    }
  };

  const handleSentenceClick = (start: number) => {
    audio.currentTime = start / 1000; // Convert milliseconds to seconds
    audio.play();
  };

  const getTextColor = (start: number, end: number): any => {
    if (currentAudioMs < start) {
      return { color: "#686868" };
    } else if (currentAudioMs >= start && currentAudioMs <= end) {
      return {
        backgroundColor:
          "rgba(149, 117, 205, 0.5)" /* Semi-transparent purple */,
        color: "#FFFFFF" /* White text for better readability */,
        borderRadius: "4px" /* Soften the corners */,
        padding: "0 5px" /* Slight padding to the highlight */,
      };
    } else {
      return { color: "#c5c5c5" };
    }
  };

  useEffect(() => {
    dispatch(fetchReadingText());
  }, []);

  useEffect(() => {
    audio.addEventListener("timeupdate", () => {
      setCurrentAudioMs(audio.currentTime * 1000); // Convert seconds to milliseconds
    });

    return () => {
      // Clean up event listener on component unmount
      audio.removeEventListener("timeupdate", () => {});
    };
  }, [audio]);

  return (
    <div className={style.readingContainer}>
      <div className={style.textWrapper}>
        <h2>{text && text.title}</h2>
        <IconButton className={style.audioButton} onClick={handlePlayAudio}>
          <VolumeUpIcon />
        </IconButton>
        <div className={style.paragraphsWrapper}>
          {text &&
            text.paragraphs.map((paragraph, index) => (
              <div key={index} className={style.paragraph}>
                {paragraph.sentences.map((sentence, idx) => (
                  <span
                    key={idx}
                    style={getTextColor(sentence.start, sentence.end)}
                    onClick={() => handleSentenceClick(sentence.start)}
                  >
                    {sentence.text}{" "}
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingText;
