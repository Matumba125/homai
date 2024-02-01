import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReadingText } from "../../../app/store/selectors";
import { AppDispatch } from "../../../app/store/store";
import { fetchReadingText } from "../bll/textReducer";
import style from "./text-style.module.scss";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useCheckStudentRole } from "../../../shared/utilities/checkUserRole";
import { useCheckLessonId } from "../../../shared/utilities/checkLessonIdAvailable";

const ReadingText = () => {
  useCheckStudentRole();
  const audioRef = useRef(new Audio());
  const [currentAudioMs, setCurrentAudioMs] = useState(0);
  const text = useSelector(getReadingText);
  const dispatch = useDispatch<AppDispatch>();
  useCheckLessonId();

  const handlePlayAudio = () => {
    const audio = audioRef.current;
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

  const handleSentenceClick = (
    start: number,
    event: MouseEvent<HTMLSpanElement>,
  ) => {
    event.stopPropagation();
    const audio = audioRef.current;
    setCurrentAudioMs(start);
    audio.currentTime = start / 1000;
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
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentAudioMs(audio.currentTime * 1000); // Convert seconds to milliseconds
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      // Clean up event listener on component unmount
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

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
                    onClick={(event) =>
                      handleSentenceClick(sentence.start, event)
                    }
                  >
                    {sentence.text}
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
