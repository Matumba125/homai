import axios from "axios";
import {
  AuthDataType,
  AvatarUpdateResponseType,
  UserDataType,
} from "../../entities/user/bll/userReducer";
import { CorrespondenceTaskType } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { SentenceTaskType } from "../../pages/sentence-game/bll/sentenceReducer";
import { SpeakingTaskType } from "../../pages/speaking-game/bll/speakingReducer";
import { CreateLessonStateType } from "../../pages/teacher-room/bll/teacherRoomReducer";
import {
  ClassroomType,
  ClassType,
} from "../../entities/ classroom/bll/ classroomReducer";

type SpeakingAnswerResponseType = {
  result: "OK" | "BAD";
};

const axiosLiveInstance = axios.create({
  withCredentials: true,
  baseURL: "https://eng.aiteacher.ru/",
});

export const Games = {
  getCorrespondenceTasks: () => {
    return axiosLiveInstance.get<CorrespondenceTaskType[]>(
      "correspondenceTasks",
    );
  },
  getSentenceTasks: () => {
    return axiosLiveInstance.get<SentenceTaskType[]>("sentenceTasks");
  },
  getSpeakingTasks: () => {
    return axiosLiveInstance.get<SpeakingTaskType[]>("sentenceTasks");
  },
  sendSpeakingAnswer: (formData: FormData) => {
    return axiosLiveInstance.post<SpeakingAnswerResponseType>("game", formData);
  },
};

export const User = {
  getUser: (userId: number) => {
    return axiosLiveInstance.post<UserDataType>("user", userId);
  },
  updateUsername: (username: string) => {
    return axiosLiveInstance.put("user/username", { username });
  },
  updateAvatar: (image: File) => {
    const formData = new FormData();
    //@ts-ignore
    formData.append("image", image);
    return axiosLiveInstance.put<AvatarUpdateResponseType>(
      "user/photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
};

type GetCreateLessonGenerateRequestType = {
  theme: string;
};

type GetCreateLessonWordsResponseType = {
  words: string;
};

type GetCreateLessonSentencesResponseType = {
  sentences: string;
};

type FetchClassesResponseType = {
  classesList: ClassroomType[];
};

type FetchClassResponseType = {
  class: ClassType;
};

export type AddClassRequestType = {
  title: string;
  studentsList: string;
};

export const TeacherRoom = {
  getCreateLessonWords: (data: GetCreateLessonGenerateRequestType) => {
    return axiosLiveInstance.post<GetCreateLessonWordsResponseType>(
      "generate/words",
      data,
    );
  },
  getCreateLessonSentences: (data: GetCreateLessonGenerateRequestType) => {
    return axiosLiveInstance.post<GetCreateLessonSentencesResponseType>(
      "generate/sentences",
      data,
    );
  },
  createLesson: (data: CreateLessonStateType) => {
    return axiosLiveInstance.put("generate/create-lesson", data);
  },
  fetchClasses: () => {
    return axiosLiveInstance.get<FetchClassesResponseType>(
      "classes/get-classes-list",
    );
  },
  fetchClass: (id: number) => {
    return axiosLiveInstance.put<FetchClassResponseType>(
      "classes/get-class",
      id,
    );
  },
  addClass: (data: AddClassRequestType) => {
    return axiosLiveInstance.put<FetchClassesResponseType>(
      "classes/add-class",
      data,
    );
  },
};

export const Auth = {
  login: (authData: AuthDataType) => {
    return axiosLiveInstance.post<UserDataType>("auth/login");
  },
};
