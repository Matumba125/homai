import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherRoom } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

export type CreateLessonStateType = {
  theme: string;
  words: string;
  sentences: string;
  poem?: string;
  reading?: string;
};

export type TeacherRoomInitialStateType = {
  createLesson: CreateLessonStateType;
};

const testWords = {
  words:
    "blabla, blabla, blabla, blabla, blabla, asda, asdasd, adasd, asdasd, asdas",
};

const initialState: TeacherRoomInitialStateType = {
  createLesson: {
    theme: "",
    words: "",
    sentences: "",
    poem: "",
    reading: "",
  },
};

const slice = createSlice({
  name: "teacherRoom",
  initialState,
  reducers: {
    setCreateLessonTheme(state, action: PayloadAction<string>) {
      state.createLesson.theme = action.payload;
    },
    setCreateLessonWords(state, action: PayloadAction<string>) {
      state.createLesson.words = action.payload;
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
  },
});

export const {
  setCreateLessonTheme,
  setCreateLessonPoem,
  setCreateLessonSentences,
  setCreateLessonReading,
  setCreateLessonWords,
} = slice.actions;

export const getCreateLessonWords = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const data = getState() as AppStateType;
      const res = await TeacherRoom.getCreateLessonWords({
        theme: data.teacherRoom.createLesson.theme,
      });
      dispatch(slice.actions.setCreateLessonWords(res.data.words));
    } catch (e) {
      dispatch(slice.actions.setCreateLessonWords(testWords.words));
      //rejectWithValue(e);
    } finally {
      /*dispatch(slice.actions.setLoading(false));*/
    }
  },
);

export const getCreateLessonSentences = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const data = getState() as AppStateType;
      const res = await TeacherRoom.getCreateLessonSentences({
        theme: data.teacherRoom.createLesson.theme,
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

export const createLessonThunk = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const data = getState() as AppStateType;
      await TeacherRoom.createLesson({
        ...data.teacherRoom.createLesson,
      });
      dispatch(
        slice.actions.setCreateLessonData({
          ...initialState.createLesson,
        }),
      );
    } catch (e) {
      dispatch(
        slice.actions.setCreateLessonData({
          ...initialState.createLesson,
        }),
      );
      //rejectWithValue(e);
    } finally {
      /*dispatch(slice.actions.setLoading(false));*/
    }
  },
);

export const teacherRoomReducer = slice.reducer;
