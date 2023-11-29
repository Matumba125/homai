import axios from "axios";
import {
  AuthDataType,
  AvatarUpdateResponseType,
  UserDataType,
} from "../../entities/user/bll/userReducer";
import { CorrespondenceTaskType } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { SentenceTaskType } from "../../pages/sentence-game/bll/sentenceReducer";
import { SpeakingTaskType } from "../../pages/speaking-game/bll/speakingReducer";
import {
  CreateLessonStateType,
  LessonType,
} from "../../entities/ classroom/bll/lessonsReducer";
import {
  ClassroomType,
  ClassType,
  LessonResults,
  StudentType,
} from "../../entities/ classroom/bll/ classroomReducer";
import { PoemPartType } from "../../pages/poem-reading/bll/poemReducer";

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
  getPoem: (id: number) => {
    return axiosLiveInstance.get<PoemPartType[]>(`poem/${id}`);
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
  existingWords?: string;
};

export type GetCreateLessonWordsResponseType = {
  words: string;
  wrongWords?: string;
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

type FetchLessonResultsResponseType = {
  lessonResults: LessonResults;
};

type FetchClassLessonsResponseType = {
  lessons: LessonType[];
};

export type AddClassRequestType = {
  title: string;
  studentsList: string;
};

export type EditLessonRequestType = CreateLessonStateType & {
  lessonId: number;
  classId: number;
};

export type ChangeStudentNameRequestType = {
  classId: number;
  studentId: number;
  newName: string;
};

export type UpdateClassNameRequestType = {
  classId: number;
  newName: string;
};

export type FetchLessonByIdResponseType = {
  lesson: CreateLessonStateType;
  classId: number;
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
  editLesson: (data: EditLessonRequestType) => {
    return axiosLiveInstance.put("generate/edit-lesson", data);
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
  fetchLessonResults: (id: number) => {
    return axiosLiveInstance.put<FetchLessonResultsResponseType>(
      "classes/get-lesson-results",
      id,
    );
  },
  fetchClassLessons: (id: number) => {
    return axiosLiveInstance.put<FetchClassLessonsResponseType>(
      "classes/get-class-lessons",
      id,
    );
  },
  deleteLesson: (data: { lessonId: number; classId: number }) => {
    return axiosLiveInstance.delete(
      `classes/delete-lesson/${data.lessonId}/${data.classId}`,
    );
  },
  addClass: (data: AddClassRequestType) => {
    return axiosLiveInstance.put<FetchClassesResponseType>(
      "classes/add-class",
      data,
    );
  },
  changeStudentName: (data: ChangeStudentNameRequestType) => {
    return axiosLiveInstance.put<StudentType>(
      "classes/update-student-name",
      data,
    );
  },
  deleteStudent: (studentId: number) => {
    return axiosLiveInstance.delete(`classes/delete-student/${studentId}`);
  },
  updateClassName: (data: UpdateClassNameRequestType) => {
    return axiosLiveInstance.put(`classes/update-class-name}`, data);
  },
  fetchLessonById: (lessonId: number) => {
    return axiosLiveInstance.get<FetchLessonByIdResponseType>(
      `classes/fetch-lesson/${lessonId}`,
    );
  },
};

export const Auth = {
  login: (authData: AuthDataType) => {
    return axiosLiveInstance.post<UserDataType>("auth/login");
  },
};
