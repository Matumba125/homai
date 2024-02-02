import axios from "axios";

type SpeakingAnswerResponseType = {
  result: "OK" | "BAD";
};

const axiosLiveInstance = axios.create({
  withCredentials: true,
  baseURL: "https://eng.aiteacher.ru/",
});

export type LessonMenuResponseType = {
  id: number;
  title: string;
  tasks: LessonMenuItemType[];
};

export type LessonMenuItemType = {
  name: string;
  maxScore?: number;
  currentScore?: number;
};

export type ClassroomType = {
  id: number;
  title: string;
};

export type LessonResults = {
  lessonTitle: string;
  studentsResults: StudentResults[];
  maxCorrespondenceResult: number;
  maxSentenceResult: number;
  maxSpeakingResult: number;
};

export type StudentResults = {
  id: number;
  name: string;
  correspondenceResult?: number;
  sentenceResult?: number;
  speakingResult?: number;
};

export type ClassType = {
  id: number;
  title: string;
  studentsList: StudentType[];
};

export type LessonListItemType = {
  id: number;
  title: string;
};

export type CorrespondenceResponseType = {
  tasks: CorrespondenceTaskType[];
  currentScore: number;
  maxScore: number;
};

export type CorrespondenceTaskType = {
  id: number;
  word: string;
  image: string;
  audioUrl: string;
};

export type SentenceResponseType = {
  tasks: SentenceTaskType[];
  maxScore: number;
  currentScore: number;
};

export type SentenceTaskType = {
  id: number;
  sentence: string;
};

export type SpeakingTaskResponse = {
  tasks: SpeakingTaskType[];
  maxScore: number;
  currentScore: number;
};

export type SpeakingTaskType = {
  id: number;
  text: string;
};

export type PoemPartType = {
  audio: string;
  parts: Array<{
    smallAudio: string;
    rowOne: string;
    rowTwo: string;
    id: number;
  }>;
  id: number;
};

export type ReadingTextType = {
  title: string;
  audio: string;
  paragraphs: ParagraphType[];
};

export type ParagraphType = {
  sentences: Array<{
    text: string;
    start: number;
    end: number;
  }>;
};

type SendResultsRequestType = {
  lessonId: number;
  item_id: number;
  result: boolean;
  exerciseType: "correspondence" | "sentence" | "reading";
};

export const Games = {
  getLessonMenu: (lessonId: number) => {
    return axiosLiveInstance.get<LessonMenuResponseType>(
      `lesson-menu/${lessonId}`,
    );
  },
  getLessonsList: () => {
    return axiosLiveInstance.get<LessonListItemType[]>(`lessons-list`);
  },
  getCorrespondenceTasks: (lessonId: number) => {
    return axiosLiveInstance.get<CorrespondenceResponseType>(
      `tasks/correspondence/${lessonId}`,
    );
  },
  getSentenceTasks: (lessonId: number) => {
    return axiosLiveInstance.get<SentenceResponseType>(
      `tasks/sentence/${lessonId}`,
    );
  },
  getSpeakingTasks: (lessonId: number) => {
    return axiosLiveInstance.get<SpeakingTaskResponse>(
      `tasks/speaking/${lessonId}`,
    );
  },
  sendSpeakingAnswer: (formData: FormData) => {
    return axiosLiveInstance.post<SpeakingAnswerResponseType>(
      "tasks/speaking",
      formData,
    );
  },
  sendGameResult: (data: SendResultsRequestType) => {
    return axiosLiveInstance.put("tasks/sentence/result", data);
  },
  getPoem: (lessonId: number) => {
    return axiosLiveInstance.get<PoemPartType[]>(`tasks/poem/${lessonId}`);
  },
  getText: (lessonId: number) => {
    return axiosLiveInstance.get<ReadingTextType>(`tasks/text/${lessonId}`);
  },
};

export type UserDataType = {
  id: number;
  username: string;
  avatar?: string;
  role: "student" | "teacher";
};

export type AvatarUpdateResponseType = {
  url: string;
};

export const User = {
  getUser: (userId: number) => {
    return axiosLiveInstance.post<UserDataType>("user", userId);
  },
  updateUsername: (username: string) => {
    return axiosLiveInstance.put("user/username", { username });
  },
  logOut: () => {
    return axiosLiveInstance.post("user/logout");
  },
  updateAvatar: (image: File) => {
    const formData = new FormData();
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

export type EnabledTask = {
  type: "correspondence" | "sentence" | "speaking";
  maxScore: number;
};

export type EditLessonRequestType = CreateLessonStateType & {
  lessonId: number;
  classId: number;
  enabledTasks: EnabledTask[];
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

export type SetLessonAvailableRequestType = {
  lessonId: number;
  available: boolean;
};

export type CreateLessonStateType = {
  theme: string;
  words: string;
  sentences: string;
  poem?: string;
  reading?: string;
  date?: Date;
  enabledTasks: EnabledTask[];
};

export type CreateLessonRequestType = CreateLessonStateType & {
  classId: number;
  enabledTasks: EnabledTask[];
};

export type StudentType = {
  id: number;
  classId: number;
  name: string;
  username: string;
  password: string;
};

export type LessonType = {
  id: number;
  title: string;
  link: string;
  date: Date;
  available: boolean;
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
  createLesson: (data: CreateLessonRequestType) => {
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
    return axiosLiveInstance.get<FetchClassResponseType>(
      `classes/get-class/${id}`,
    );
  },
  fetchLessonResults: (id: number) => {
    return axiosLiveInstance.get<FetchLessonResultsResponseType>(
      `classes/get-lesson-results/${id}`,
    );
  },
  fetchClassLessons: (id: number) => {
    return axiosLiveInstance.get<FetchClassLessonsResponseType>(
      `classes/get-class-lessons/${id}`,
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
    return axiosLiveInstance.put(`classes/update-class-name/${data.classId}`, {
      newName: data.newName,
    });
  },
  fetchLessonById: (lessonId: number) => {
    return axiosLiveInstance.get<FetchLessonByIdResponseType>(
      `classes/fetch-lesson/${lessonId}`,
    );
  },
  setLessonAvailable: (data: SetLessonAvailableRequestType) => {
    return axiosLiveInstance.post<LessonType>(`classes/update-lesson`, data);
  },
};

export type AuthDataType = {
  username: string;
  password: string;
};

export const Auth = {
  login: (authData: AuthDataType) => {
    return axiosLiveInstance.post<UserDataType>("auth/login", authData);
  },
  me: () => {
    return axiosLiveInstance.get<UserDataType>("auth/me");
  },
};
