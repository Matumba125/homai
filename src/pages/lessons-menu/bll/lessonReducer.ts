import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Games,
  LessonListItemType,
  LessonMenuResponseType,
} from "../../../app/api/api";

export type LessonMenuType = {
  id?: number;
  title?: string;
  tasks?: Array<string>;
};

const testLessonMenu: LessonMenuResponseType = {
  id: 1,
  title: "Город",
  tasks: ["correspondence", "sentence", "speaking", "poem", "reading"],
};

const testLessonsList: LessonListItemType[] = [
  {
    id: 1,
    title: "Город",
  },
  {
    id: 2,
    title: "Природа",
  },
  {
    id: 3,
    title: "Лес",
  },
  {
    id: 4,
    title: "Машины",
  },
];

interface LessonMenuState {
  lesson: LessonMenuType;
  error: string | null;
  lessonsList: LessonListItemType[];
}

const initialState: LessonMenuState = {
  lesson: {},
  error: null,
  lessonsList: [],
};

const slice = createSlice({
  name: "lessonMenu",
  initialState,
  reducers: {
    setLessonId(state, action: PayloadAction<number>) {
      state.lesson.id = action.payload;
    },
    setLessonTitle(state, action: PayloadAction<string>) {
      state.lesson.title = action.payload;
    },
    setLessonTasks(state, action: PayloadAction<string[]>) {
      state.lesson.tasks = action.payload;
    },
    setLessonMenu(state, action: PayloadAction<LessonMenuResponseType>) {
      state.lesson = action.payload;
      state.error = null; // Clear any previous errors when setting the lesson
    },
    setLessonsList(state, action: PayloadAction<LessonListItemType[]>) {
      state.lessonsList = action.payload;
      state.error = null; // Clear any previous errors when setting the lesson
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const fetchLessonMenu = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>("lessonMenu/fetchLessonMenu", async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await Games.getLessonMenu(id);
    dispatch(slice.actions.setLessonMenu(res.data));
    return res.data;
  } catch (e) {
    dispatch(slice.actions.setError("Failed to fetch lesson menu."));
    return rejectWithValue("Failed to fetch lesson menu.");
  }
});

export const fetchLessonsList = createAsyncThunk<any>(
  "lessonMenu/fetchLessonsList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await Games.getLessonsList();
      dispatch(slice.actions.setLessonsList(res.data));
      return res.data;
    } catch (e) {
      dispatch(slice.actions.setError("Failed to fetch lesson menu."));
      return rejectWithValue("Failed to fetch lesson menu.");
    }
  },
);

export const { setLessonId } = slice.actions;

export const lessonMenuReducer = slice.reducer;
