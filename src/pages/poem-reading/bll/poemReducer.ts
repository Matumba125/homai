import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games, PoemPartType } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

const initialState: { poem?: PoemPartType[] } = {};

const slice = createSlice({
  name: "poem",
  initialState,
  reducers: {
    setPoem(state, action: PayloadAction<PoemPartType[]>) {
      state.poem = action.payload;
    },
  },
});

export const fetchPoem = createAsyncThunk<any>(
  "poem/fetchPoem",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        const res = await Games.getPoem(state.lessonMenu.lesson.id);
        dispatch(slice.actions.setPoem(res.data));
      }
    } catch (e) {
      rejectWithValue(e);
    } finally {
    }
  },
);

export const poemReducer = slice.reducer;
