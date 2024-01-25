import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games, ReadingTextType } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

interface TextState {
  readingText?: ReadingTextType;
  loading: boolean;
  error: string | null;
}

const initialState: TextState = {
  readingText: undefined,
  loading: false,
  error: null,
};

export const fetchReadingText = createAsyncThunk<any>(
  "text/fetchReadingText",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as AppStateType;
      if (state.lessonMenu.lesson.id) {
        const res = await Games.getText(state.lessonMenu.lesson.id);
        dispatch(setReadingText(res.data));
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setReadingText(state, action: PayloadAction<ReadingTextType>) {
      state.readingText = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReadingText.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReadingText.fulfilled, (state, action) => {
      state.loading = false;
      state.readingText = action.payload;
    });
    builder.addCase(fetchReadingText.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setReadingText, setError } = textSlice.actions;

export const textReducer = textSlice.reducer;
