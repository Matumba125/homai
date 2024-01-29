import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, AuthDataType, User, UserDataType } from "../../../app/api/api";

export type UserInitialStateType = {
  user?: UserDataType;
  isLoggedIn: boolean;
};

const initialState: UserInitialStateType = {
  isLoggedIn: true,
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
    setUserData(state, action: PayloadAction<UserDataType | undefined>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authUser = createAsyncThunk<any, AuthDataType>(
  "user/auth",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await Auth.login(data);
      dispatch(slice.actions.setUserData(res.data));
      dispatch(slice.actions.setIsLoggedIn(true));
    } catch (e) {
      dispatch(slice.actions.setIsLoggedIn(false));
    }
  },
);

export const authUserPing = createAsyncThunk(
  "user/authPing",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await Auth.me();
      if (res.data) {
        dispatch(slice.actions.setUserData(res.data));
        dispatch(slice.actions.setIsLoggedIn(true));
      } else {
        throw Error("User not found");
      }
    } catch (e) {
      dispatch(slice.actions.setIsLoggedIn(false));
      rejectWithValue(e);
    }
  },
);

export const logOutThunk = createAsyncThunk<any>(
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await User.logOut();
      dispatch(slice.actions.setUserData(undefined));
      dispatch(slice.actions.setIsLoggedIn(false));
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const getUser = createAsyncThunk<any, number>(
  "user/getUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await User.getUser(data);
      dispatch(slice.actions.setUserData(res.data));
    } catch (e) {
      rejectWithValue(e);
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
      rejectWithValue(e);
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
      rejectWithValue(e);
    }
  },
);

export const userReducer = slice.reducer;
