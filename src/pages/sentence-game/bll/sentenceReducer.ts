import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games } from "../../../app/api/api";

export type SentenceTaskType = {
  id: number;
  sentence: string;
};

const testTasks = [
  {
    id: 1,
    sentence: "Я люблю кушать",
  },
  {
    id: 2,
    sentence: "Я вижу гору за поворотом",
  },
  {
    id: 3,
    sentence: "Поезд приближается к станции",
  },
  {
    id: 4,
    sentence: "Солнце заходит за горизонт",
  },
  {
    id: 5,
    sentence: "Цветок растёт перед верандой",
  },
];

export type SentenceInitialStateType = {
  tasks: SentenceTaskType[];
  availableTasks: SentenceTaskType[];
  isLoading: boolean;
};

const initialState: SentenceInitialStateType = {
  tasks: [],
  availableTasks: [],
  isLoading: true,
};

const slice = createSlice({
  name: "sentence",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<SentenceTaskType[]>) {
      state.tasks = action.payload;
    },
    setAvailableTasks(state, action: PayloadAction<SentenceTaskType[]>) {
      state.availableTasks = action.payload;
    },
    restartSentenceTest(state) {
      state.availableTasks = state.tasks;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    removeAvailableSentenceTasks(state, action: PayloadAction<number>) {
      const tempArr = [...state.availableTasks];
      state.availableTasks = tempArr.filter((el) => el.id !== action.payload);
    },
  },
});

export const { removeAvailableSentenceTasks, restartSentenceTest } =
  slice.actions;

export const fetchSentenceTasks = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await Games.getSentenceTasks();
      if (res.data) {
        dispatch(slice.actions.setTasks(res.data));
        dispatch(slice.actions.setAvailableTasks(res.data));
      } else {
        dispatch(slice.actions.setTasks(testTasks));
        dispatch(slice.actions.setAvailableTasks(testTasks));
      }
    } catch (e) {
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const sentenceReducer = slice.reducer;
