import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateLessonStateType,
  EnabledTask,
  GetCreateLessonWordsResponseType,
  LessonType,
  TeacherRoom,
} from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";
import { fetchClass } from "./ classroomReducer";

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
    available: true,
  },
  {
    id: 2,
    title: "Животные",
    link: "https://www.google.com/",
    date: new Date(),
    available: true,
  },
  {
    id: 3,
    title: "Природа",
    link: "https://www.google.com/",
    date: new Date(),
    available: true,
  },
  {
    id: 4,
    title: "Море",
    link: "https://www.google.com/",
    date: new Date(),
    available: false,
  },
  {
    id: 5,
    title: "Космос",
    link: "https://www.google.com/",
    date: new Date(),
    available: false,
  },
];

const testFetchData: CreateLessonStateType = {
  theme: "TestTheme",
  words: "asdas sdadsa dasada sdasda dasd a",
  sentences:
    "asdassds asdasdasd asdasfasfasfaff.  asdasdasfasfasf. adfasfsafsa afsasfasfasf.",
  poem: "sadfdaa",
  date: new Date(),
};

const initialState: TeacherRoomInitialStateType = {
  createLesson: {
    theme: "",
    words: "",
    sentences: "",
    poem: "",
    reading: "",
    date: new Date(),
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
    setCreateLessonDate(state, action: PayloadAction<Date>) {
      state.createLesson.date = action.payload;
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
    setLesson(state, action: PayloadAction<LessonType>) {
      if (state.lessons) {
        const index = state.lessons.findIndex(
          (lesson) => lesson.id === action.payload.id,
        );
        if (index !== -1) {
          state.lessons[index] = action.payload;
        }
      }
    },
    deleteLesson(state, action: PayloadAction<number>) {
      // Assuming lessons is an array of LessonType objects
      state.lessons = state.lessons?.filter(
        (lesson) => lesson.id !== action.payload,
      );
    },
  },
});

export const {
  setCreateLessonTheme,
  setCreateLessonSentences,
  setCreateLessonWords,
  setCreateLessonReading,
  setCreateLessonPoem,
  setCreateLessonDate,
} = slice.actions;

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
  { lessonId?: number; classId: number; enabledTasks: EnabledTask[] }
>(
  "lessons/CreateLesson",
  async (lessonData, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const data = getState() as AppStateType;
      if (lessonData.lessonId) {
        await TeacherRoom.editLesson({
          ...data.lessons.createLesson,
          lessonId: lessonData.lessonId,
          classId: lessonData.classId,
          enabledTasks: lessonData.enabledTasks,
        });
      } else {
        await TeacherRoom.createLesson({
          ...data.lessons.createLesson,
          classId: lessonData.classId,
          enabledTasks: lessonData.enabledTasks,
        });
      }
      dispatch(
        slice.actions.setCreateLessonData({
          theme: "",
          words: "",
          sentences: "",
          poem: "",
          reading: "",
          date: new Date(),
        }),
      );
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
      rejectWithValue(e);
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
      rejectWithValue(e);
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
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const setLessonAvailableThunk = createAsyncThunk<
  any,
  { lessonId: number; available: boolean }
>(
  "lessons/setLessonAvailable",
  async (data, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppStateType;
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.setLessonAvailable(data);
      dispatch(slice.actions.setLesson(res.data));
    } catch (e) {
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const lessonsReducer = slice.reducer;
