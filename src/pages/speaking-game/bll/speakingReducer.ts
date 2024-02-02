import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Games,
  SpeakingTaskResponse,
  SpeakingTaskType,
} from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

export type SpeakingInitialStateType = {
  tasks: SpeakingTaskType[];
  availableTasks: SpeakingTaskType[];
  isLoading: boolean;
  maxScore?: number;
  currentScore?: number;
};

const initialState: SpeakingInitialStateType = {
  tasks: [],
  availableTasks: [],
  isLoading: true,
};

const slice = createSlice({
  name: "speaking",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<SpeakingTaskType[]>) {
      state.tasks = action.payload;
    },
    setAvailableTasks(state, action: PayloadAction<SpeakingTaskType[]>) {
      state.availableTasks = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSpeakingData(state, action: PayloadAction<SpeakingTaskResponse>) {
      state.tasks = action.payload.tasks;
      state.availableTasks = action.payload.tasks;
      state.maxScore = action.payload.maxScore;
      state.currentScore = action.payload.currentScore;
    },
    removeAvailableSpeakingTasks(state, action: PayloadAction<number>) {
      const tempArr = [...state.availableTasks];
      state.availableTasks = tempArr.filter((el) => el.id !== action.payload);
    },
  },
});

export const { removeAvailableSpeakingTasks } = slice.actions;

export const fetchSpeakingTasks = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        dispatch(slice.actions.setLoading(true));
        const res = await Games.getSpeakingTasks(state.lessonMenu.lesson.id);
        dispatch(slice.actions.setSpeakingData(res.data));
      }
    } catch (e) {
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const speakingReducer = slice.reducer;
