import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CorrespondenceTaskType, Games } from "../../../app/api/api";
import _ from "lodash";
import { AppStateType } from "../../../app/store/store";

export type CorrespondenceInitialStateType = {
  tasks: CorrespondenceTaskType[];
  availableTasks: CorrespondenceTaskType[];
  maxScore?: number;
  currentScore?: number;
};

const initialState: CorrespondenceInitialStateType = {
  tasks: [],
  availableTasks: [],
};

const slice = createSlice({
  name: "correspondence",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<CorrespondenceTaskType[]>) {
      state.tasks = action.payload;
    },
    setAvailableTasks(state, action: PayloadAction<CorrespondenceTaskType[]>) {
      state.availableTasks = action.payload;
    },
    setMaxScore(state, action: PayloadAction<number | undefined>) {
      state.maxScore = action.payload;
    },
    setCurrentScore(state, action: PayloadAction<number | undefined>) {
      state.currentScore = action.payload;
    },
    removeAvailableCorrespondenceTasks(state, action: PayloadAction<number[]>) {
      const tempArr = [...state.availableTasks];
      _.remove(tempArr, function (el) {
        return action.payload.indexOf(el.id) >= 0;
      });
      state.availableTasks = tempArr;
    },
  },
});

export const { removeAvailableCorrespondenceTasks } = slice.actions;

export const fetchCorrespondenceTasks = createAsyncThunk<any>(
  "correspondence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        const res = await Games.getCorrespondenceTasks(
          state.lessonMenu.lesson.id,
        );
        dispatch(slice.actions.setTasks(res.data.tasks));
        dispatch(slice.actions.setAvailableTasks(res.data.tasks));
        dispatch(slice.actions.setMaxScore(res.data.maxScore));
        dispatch(slice.actions.setCurrentScore(res.data.currentScore));
      }
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const correspondenceReducer = slice.reducer;
