import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games } from "../../../app/api/api";
import { AppStateType } from "../../../app/store/store";

export type ReadingTextType = {
  title: string;
  audio: string;
  paragraphs: ParagraphType[];
};

export type ParagraphType = {
  sentences: Array<{
    text: string;
    start: number;
    end: number;
  }>;
};

const temp = {
  title: "Test",
  audio: "https://cdn.pixabay.com/audio/2022/03/14/audio_f6e45b1aaf.mp3",
  paragraphs: [
    {
      sentences: [
        {
          text: "Hello jsndjkcsjc csj skjcksacklasskl cms kjc sklm clks dklc  scmsd cjk scjk slmdc mlsc kjls ckjds ckjds ckjls ckj hj csj cks xknjc jkc",
          start: 1,
          end: 2000,
        },
        {
          text: "Hello dskjklsmfklsdmfkjsdkl dkjfjdsnfjksd dn fjdnfjskslkk d smkfmksd ms kdfmjs fmklsk nk skm v skn vkjs lkv ksn clkmlksc sknbv jsmldc vdm kjnm sd km,sdv kjls cms vkjsmkc sn ckosm cslmvc josvmm vlkmjsnvjs dn ckjs",
          start: 2001,
          end: 4000,
        },
      ],
    },
    {
      sentences: [
        {
          text: "Bye ds/,cvmsdlcksldmjk  jdsncjs cjksd cjksdhbmkls ccjsdn cjksd cksjh ms cjs dcnj scnkms ckls nj cnsc jsncjs cbsmzc kjs c nc slkcn shj dckmslmckl; s j mkc sjcns cl;ksknhj smc koscn sb",
          start: 4001,
          end: 6000,
        },
        {
          text: "Bye sdcscjksckl sjn jdncjsnjck skjmckcs cn sklcnkjsv jsvnjscmklsvjknvkmksl  jsvnjsmksmvskvndj jsvbjsmcklsmoivvnhjsv  jsvnjsclksnvjksnvijk sjnvskv sjvnskcmvslkchjsnvj ",
          start: 6001,
          end: 27000,
        },
      ],
    },
  ],
};

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
      /*dispatch(setReadingText(temp));*/
      return temp;
      /*dispatch(setError('Failed to fetch reading text.'));
            return rejectWithValue(error.message);*/
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
