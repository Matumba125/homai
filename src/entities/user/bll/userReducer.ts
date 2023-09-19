import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../app/api/api";

export type UserDataType = {
  id: number;
  username: string;
  avatar?: File;
  status: "student" | "teacher";
};

export type AuthDataType = {
  username: string;
  password: string;
};

export type UserInitialStateType = {
  user: UserDataType;
  isLoggedIn: boolean;
};

const initialState: UserInitialStateType = {
  user: {
    id: 0,
    username: "",
    avatar: undefined,
    status: "student",
  },
  isLoggedIn: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.user.username = action.payload;
    },
    setAvatar(state, action: PayloadAction<File | undefined>) {
      state.user.avatar = action.payload;
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
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(slice.actions.setUsername("Тестовый пользователь"));
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
      await User.updateAvatar(data);
      dispatch(slice.actions.setAvatar(data));
    } catch (e) {
      dispatch(slice.actions.setAvatar(data));
      //rejectWithValue(e);
    }
  },
);

export const userReducer = slice.reducer;
