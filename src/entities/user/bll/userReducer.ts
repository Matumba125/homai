import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../app/api/api";

export type UserDataType = {
  id: number;
  username: string;
  avatar?: string;
  role: "student" | "teacher";
};

export type AvatarUpdateResponseType = {
  url: string;
};

export type AuthDataType = {
  username: string;
  password: string;
};

export type UserInitialStateType = {
  user?: UserDataType;
  isLoggedIn: boolean;
};

const userTestData: UserDataType = {
  id: 0,
  username: "",
  avatar:
    "https://img.freepik.com/premium-photo/there-is-white-cat-that-is-laying-down-green-surface-generative-ai_955884-17559.jpg?w=360",
  role: "teacher",
};

const initialState: UserInitialStateType = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.username = action.payload;
      }
    },
    setAvatar(state, action: PayloadAction<string | undefined>) {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
    setUserData(state, action: PayloadAction<UserDataType>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const fakeAuthUser = createAsyncThunk<any>(
  "user/fakeAuth",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(slice.actions.setUserData(userTestData));
    dispatch(slice.actions.setIsLoggedIn(true));
  },
);

export const getUser = createAsyncThunk<any, number>(
  "user/getUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await User.getUser(data);
      dispatch(slice.actions.setUserData(res.data));
    } catch (e) {
      dispatch(slice.actions.setUsername("Тестовый пользователь"));
      //rejectWithValue(e);
    }
  },
);

export const updateUsername = createAsyncThunk<any, string>(
  "user/updateUsername",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await User.updateUsername(data);
      dispatch(slice.actions.setUsername(data));
    } catch (e) {
      dispatch(slice.actions.setUsername(data));
      //rejectWithValue(e);
    }
  },
);

export const updateAvatar = createAsyncThunk<any, File>(
  "user/updateAvatar",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await User.updateAvatar(data);
      dispatch(slice.actions.setAvatar(res.data.url));
    } catch (e) {
      dispatch(slice.actions.setAvatar(""));
      //rejectWithValue(e);
    }
  },
);

export const userReducer = slice.reducer;
