import { AppStateType } from "./store";
import { CorrespondenceTaskType } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { SentenceTaskType } from "../../pages/sentence-game/bll/sentenceReducer";
import { UserDataType } from "../../entities/user/bll/userReducer";
import { SpeakingTaskType } from "../../pages/speaking-game/bll/speakingReducer";
import {
  CreateLessonStateType,
  LessonType,
} from "../../entities/ classroom/bll/lessonsReducer";
import {
  ClassroomType,
  ClassType,
  LessonResults,
} from "../../entities/ classroom/bll/ classroomReducer";
import { PoemPartType } from "../../pages/poem-reading/bll/poemReducer";
import { ReadingTextType } from "../../pages/text-reading/bll/textReducer";
import {
  LessonListItemType,
  LessonMenuType,
} from "../../pages/lessons-menu/bll/lessonReducer";

export const getCorrespondenceTasks = (
  state: AppStateType,
): CorrespondenceTaskType[] => {
  return state.correspondence.availableTasks;
};

export const getSentenceTasks = (state: AppStateType): SentenceTaskType[] => {
  return state.sentence.availableTasks;
};

export const getSentenceTasksLoading = (state: AppStateType): boolean => {
  return state.sentence.isLoading;
};

export const getIsLoggedIn = (state: AppStateType): boolean => {
  return state.user.isLoggedIn;
};

export const getUserData = (state: AppStateType): UserDataType | undefined => {
  return state.user.user;
};

export const getLessonMenu = (state: AppStateType): LessonMenuType => {
  return state.lessonMenu.lesson;
};

export const getLessonsList = (state: AppStateType): LessonListItemType[] => {
  return state.lessonMenu.lessonsList;
};

export const getLessonMenuError = (state: AppStateType): string | null => {
  return state.lessonMenu.error;
};

export const getSpeakingTasks = (state: AppStateType): SpeakingTaskType[] => {
  return state.speaking.availableTasks;
};

export const getSpeakingTasksLoading = (state: AppStateType): boolean => {
  return state.speaking.isLoading;
};

export const getCreateLessonData = (
  state: AppStateType,
): CreateLessonStateType => {
  return state.lessons.createLesson;
};

export const getClassesList = (state: AppStateType): ClassroomType[] => {
  return state.classroom.classes;
};

export const getClass = (state: AppStateType): ClassType | undefined => {
  return state.classroom.class;
};

export const getLessonResults = (
  state: AppStateType,
): LessonResults | undefined => {
  return state.classroom.lessonResults;
};

export const getClassLessons = (
  state: AppStateType,
): LessonType[] | undefined => {
  return state.lessons.lessons;
};

export const getClassLoading = (state: AppStateType): boolean => {
  return state.lessons.isLoading;
};

export const getWrongWords = (state: AppStateType): string | undefined => {
  return state.lessons.wrongWords;
};

export const getPoem = (state: AppStateType): PoemPartType[] | undefined => {
  return state.poem.poem;
};

export const getReadingText = (
  state: AppStateType,
): ReadingTextType | undefined => {
  return state.text.readingText;
};
