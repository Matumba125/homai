import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games, SentenceTaskType } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

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
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        dispatch(slice.actions.setLoading(true));
        const res = await Games.getSentenceTasks(state.lessonMenu.lesson.id);
        dispatch(slice.actions.setTasks(res.data));
        dispatch(slice.actions.setAvailableTasks(res.data));
      }
    } catch (e) {
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const sentenceReducer = slice.reducer;
