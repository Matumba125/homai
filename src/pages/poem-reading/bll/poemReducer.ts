import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games } from "../../../app/api/api";

export type PoemPartType = {
  audio: string;
  parts: Array<{ smallAudio: string; rowOne: string; rowTwo: string }>;
};

const test: PoemPartType[] = [
  {
    audio: "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
    parts: [
      {
        smallAudio:
          "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
        rowOne: "some text",
        rowTwo: "some text",
      },
      {
        smallAudio:
          "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
        rowOne: "some text",
        rowTwo: "some text",
      },
    ],
  },
  {
    audio: "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
    parts: [
      {
        smallAudio:
          "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
        rowOne: "some text",
        rowTwo: "some text",
      },
      {
        smallAudio:
          "https://cdn.pixabay.com/audio/2021/08/04/audio_473a42432c.mp3",
        rowOne: "some text",
        rowTwo: "some text",
      },
    ],
  },
];

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

export const fetchPoem = createAsyncThunk<any, number>(
  "poem/fetchPoem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await Games.getPoem(id);
      dispatch(slice.actions.setPoem(res.data));
    } catch (e) {
      dispatch(slice.actions.setPoem(test));
      //rejectWithValue(e);
    } finally {
    }
  },
);

export const poemReducer = slice.reducer;
