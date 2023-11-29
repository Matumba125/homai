import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetCreateLessonWordsResponseType,
  TeacherRoom,
} from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";
import { fetchClass } from "./ classroomReducer";

export type CreateLessonStateType = {
  theme: string;
  words: string;
  sentences: string;
  poem?: string;
  reading?: string;
};

export type LessonType = {
  id: number;
  title: string;
  link: string;
  date: Date;
};

export type TeacherRoomInitialStateType = {
  createLesson: CreateLessonStateType;
  isLoading: boolean;
  lessons?: LessonType[];
  wrongWords?: string;
};

const testWords: GetCreateLessonWordsResponseType = {
  words:
    "blabla, blabla, blabla, blabla, blabla, asda, asdasd, adasd, asdasd, asdas",
  wrongWords: "blabla, blabla, blabla, blabla",
};

const testLessons: LessonType[] = [
  {
    id: 1,
    title: "Город",
    link: "https://www.google.com/",
    date: new Date(),
  },
  {
    id: 2,
    title: "Животные",
    link: "https://www.google.com/",
    date: new Date(),
  },
  {
    id: 3,
    title: "Природа",
    link: "https://www.google.com/",
    date: new Date(),
  },
  {
    id: 4,
    title: "Море",
    link: "https://www.google.com/",
    date: new Date(),
  },
  {
    id: 5,
    title: "Космос",
    link: "https://www.google.com/",
    date: new Date(),
  },
];

const testFetchData: CreateLessonStateType = {
  theme: "TestTheme",
  words: "asdas sdadsa dasada sdasda dasd a",
  sentences:
    "asdassds asdasdasd asdasfasfasfaff.  asdasdasfasfasf. adfasfsafsa afsasfasfasf.",
  poem: "sadfdaa",
};

const initialState: TeacherRoomInitialStateType = {
  createLesson: {
    theme: "",
    words: "",
    sentences: "",
    poem: "",
    reading: "",
  },
  isLoading: false,
};

const slice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setCreateLessonTheme(state, action: PayloadAction<string>) {
      state.createLesson.theme = action.payload;
    },
    setCreateLessonWords(state, action: PayloadAction<string>) {
      state.createLesson.words = action.payload;
    },
    setCreateLessonWrongWords(state, action: PayloadAction<string>) {
      state.wrongWords = action.payload;
    },
    setCreateLessonSentences(state, action: PayloadAction<string>) {
      state.createLesson.sentences = action.payload;
    },
    setCreateLessonPoem(state, action: PayloadAction<string>) {
      state.createLesson.poem = action.payload;
    },
    setCreateLessonReading(state, action: PayloadAction<string>) {
      state.createLesson.reading = action.payload;
    },
    setCreateLessonData(state, action: PayloadAction<CreateLessonStateType>) {
      state.createLesson = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLessons(state, action: PayloadAction<LessonType[]>) {
      state.lessons = action.payload;
    },
    deleteLesson(state, action: PayloadAction<number>) {
      // Assuming lessons is an array of LessonType objects
      state.lessons = state.lessons?.filter(
        (lesson) => lesson.id !== action.payload,
      );
    },
  },
});

export const { setCreateLessonTheme } = slice.actions;

export const getCreateLessonWords = createAsyncThunk<
  any,
  { existingWords?: string }
>(
  "lessons/getWords",
  async (words, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const data = getState() as AppStateType;
      const res = await TeacherRoom.getCreateLessonWords({
        theme: data.lessons.createLesson.theme,
        existingWords: words.existingWords,
      });
      dispatch(slice.actions.setCreateLessonWords(res.data.words));
      if (res.data.wrongWords) {
        dispatch(slice.actions.setCreateLessonWrongWords(res.data.wrongWords));
      }
    } catch (e) {
      dispatch(slice.actions.setCreateLessonWords(testWords.words));
      if (testWords.wrongWords) {
        dispatch(slice.actions.setCreateLessonWrongWords(testWords.wrongWords));
      }
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const getCreateLessonSentences = createAsyncThunk<any>(
  "lessons/getSentences",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const data = getState() as AppStateType;
      const res = await TeacherRoom.getCreateLessonSentences({
        theme: data.lessons.createLesson.theme,
      });
      dispatch(slice.actions.setCreateLessonSentences(res.data.sentences));
    } catch (e) {
      dispatch(slice.actions.setCreateLessonSentences(testWords.words));
      //rejectWithValue(e);
    } finally {
      /*dispatch(slice.actions.setLoading(false));*/
    }
  },
);

export const createLessonThunk = createAsyncThunk<
  any,
  { lessonId?: number; classId?: number }
>(
  "lessons/CreateLesson",
  async (lessonData, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const data = getState() as AppStateType;
      if (lessonData.lessonId && lessonData.classId) {
        await TeacherRoom.editLesson({
          ...data.lessons.createLesson,
          lessonId: lessonData.lessonId,
          classId: lessonData.classId,
        });
      } else {
        await TeacherRoom.createLesson({
          ...data.lessons.createLesson,
        });
      }
    } catch (e) {
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const fetchClassLessons = createAsyncThunk<any, number>(
  "lessons/fetchClassLessons",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.fetchClassLessons(id);
      dispatch(slice.actions.setLessons(res.data.lessons));
    } catch (e) {
      dispatch(slice.actions.setLessons(testLessons));
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const deleteLessonThunk = createAsyncThunk<
  any,
  { lessonId: number; classId: number }
>(
  "classroom/deleteStudentThunk",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      await TeacherRoom.deleteLesson(data);
      dispatch(slice.actions.deleteLesson(data.lessonId));
    } catch (e) {
      dispatch(slice.actions.deleteLesson(data.lessonId));
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const fetchLessonByIdThunk = createAsyncThunk<any, { lessonId: number }>(
  "lessons/fetchLessonById",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.fetchLessonById(data.lessonId);
      dispatch(slice.actions.setCreateLessonData(res.data.lesson));
      dispatch(fetchClass(res.data.classId));
    } catch (e) {
      dispatch(slice.actions.setCreateLessonData(testFetchData));
      dispatch(fetchClass(1));
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const lessonsReducer = slice.reducer;
