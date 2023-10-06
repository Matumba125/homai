import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { correspondenceReducer } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { useDispatch } from "react-redux";
import { sentenceReducer } from "../../pages/sentence-game/bll/sentenceReducer";
import { userReducer } from "../../entities/user/bll/userReducer";
import { speakingReducer } from "../../pages/speaking-game/bll/speakingReducer";
import { teacherRoomReducer } from "../../pages/teacher-room/bll/teacherRoomReducer";

export const rootReducer = combineReducers({
  correspondence: correspondenceReducer,
  sentence: sentenceReducer,
  user: userReducer,
  speaking: speakingReducer,
  teacherRoom: teacherRoomReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
