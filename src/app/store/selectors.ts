import { AppStateType } from "./store";
import {
  ClassroomType,
  ClassType,
  CorrespondenceTaskType,
  CreateLessonStateType,
  LessonListItemType,
  LessonMenuResponseType,
  LessonResults,
  LessonType,
  PoemPartType,
  ReadingTextType,
  UserDataType,
} from "app/api/api";
import { SentenceInitialStateType } from "../../pages/sentence-game/bll/sentenceReducer";
import { SpeakingInitialStateType } from "../../pages/speaking-game/bll/speakingReducer";

export const getCorrespondenceTasks = (
  state: AppStateType,
): CorrespondenceTaskType[] => {
  return state.correspondence.tasks;
};

export const getCorrespondenceMaxScore = (
  state: AppStateType,
): number | undefined => {
  return state.correspondence.maxScore;
};

export const getCorrespondenceCurrentScore = (
  state: AppStateType,
): number | undefined => {
  return state.correspondence.currentScore;
};

export const getAvailableCorrespondenceTasks = (
  state: AppStateType,
): CorrespondenceTaskType[] => {
  return state.correspondence.availableTasks;
};

export const getSentenceTasks = (
  state: AppStateType,
): SentenceInitialStateType => {
  return state.sentence;
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

export const getLessonMenu = (state: AppStateType): LessonMenuResponseType => {
  return state.lessonMenu.lesson;
};

export const getLessonsList = (state: AppStateType): LessonListItemType[] => {
  return state.lessonMenu.lessonsList;
};

export const getLessonMenuError = (state: AppStateType): string | null => {
  return state.lessonMenu.error;
};

export const getSpeakingTasks = (
  state: AppStateType,
): SpeakingInitialStateType => {
  return state.speaking;
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

export const getCurrentLessonId = (state: AppStateType): number | undefined => {
  return state.lessonMenu.lesson.id;
};

export const getReadingText = (
  state: AppStateType,
): ReadingTextType | undefined => {
  return state.text.readingText;
};
