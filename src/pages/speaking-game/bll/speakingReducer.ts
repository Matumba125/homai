import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

export type SpeakingTaskType = {
  id: number;
  text: string;
};

const testTasks = [
  {
    id: 1,
    text: "атай",
  },
];

export type SentenceInitialStateType = {
  tasks: SpeakingTaskType[];
  availableTasks: SpeakingTaskType[];
  isLoading: boolean;
};

const initialState: SentenceInitialStateType = {
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
    restartSpeakingTest(state) {
      state.availableTasks = state.tasks;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    removeAvailableSpeakingTasks(state, action: PayloadAction<number>) {
      const tempArr = [...state.availableTasks];
      state.availableTasks = tempArr.filter((el) => el.id !== action.payload);
    },
  },
});

export const { removeAvailableSpeakingTasks, restartSpeakingTest } =
  slice.actions;

export const fetchSpeakingTasks = createAsyncThunk<any>(
  "sentence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        dispatch(slice.actions.setLoading(true));
        const res = await Games.getSpeakingTasks(state.lessonMenu.lesson.id);
        dispatch(slice.actions.setTasks(res.data));
        dispatch(slice.actions.setAvailableTasks(res.data));
      }
    } catch (e) {
      dispatch(slice.actions.setTasks(testTasks));
      dispatch(slice.actions.setAvailableTasks(testTasks));
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const speakingReducer = slice.reducer;
