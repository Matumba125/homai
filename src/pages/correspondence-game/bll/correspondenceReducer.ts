import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CorrespondenceTaskType, Games } from "../../../app/api/api";
import _ from "lodash";
import { AppStateType } from "../../../app/store/store";

export type CorrespondenceInitialStateType = {
  tasks: CorrespondenceTaskType[];
  availableTasks: CorrespondenceTaskType[];
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
    restartCorrespondenceTest(state) {
      state.availableTasks = state.tasks;
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

export const { removeAvailableCorrespondenceTasks, restartCorrespondenceTest } =
  slice.actions;

export const fetchCorrespondenceTasks = createAsyncThunk<any>(
  "correspondence/fetchTasks",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        const res = await Games.getCorrespondenceTasks(
          state.lessonMenu.lesson.id,
        );
        dispatch(slice.actions.setTasks(res.data));
        dispatch(slice.actions.setAvailableTasks(res.data));
      }
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const correspondenceReducer = slice.reducer;
