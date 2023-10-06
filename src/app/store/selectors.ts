import { AppStateType } from "./store";
import { CorrespondenceTaskType } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { SentenceTaskType } from "../../pages/sentence-game/bll/sentenceReducer";
import { UserDataType } from "../../entities/user/bll/userReducer";
import { SpeakingTaskType } from "../../pages/speaking-game/bll/speakingReducer";
import { CreateLessonStateType } from "../../pages/teacher-room/bll/teacherRoomReducer";

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

export const getUserData = (state: AppStateType): UserDataType => {
  return state.user.user;
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
  return state.teacherRoom.createLesson;
};
