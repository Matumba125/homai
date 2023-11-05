import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddClassRequestType, TeacherRoom } from "../../../app/api/api";

export type ClassroomType = {
  id: number;
  title: string;
};

export type StudentType = {
  id: number;
  name: string;
};

export type ClassType = {
  id: number;
  title: string;
  studentsList: StudentType[];
};

const testClasses = [
  {
    id: 1,
    title: "1 А",
  },
  {
    id: 2,
    title: "1 Б",
  },
  {
    id: 3,
    title: "2 А",
  },
  {
    id: 4,
    title: "2 Б",
  },
  {
    id: 5,
    title: "3 А",
  },
];

const testClass: ClassType = {
  id: 1,
  title: "1 A",
  studentsList: [
    {
      id: 1,
      name: "Иванов",
    },
    {
      id: 2,
      name: "Петров",
    },
    {
      id: 3,
      name: "Сидоров",
    },
  ],
};

export type ClassroomInitialStateType = {
  classes: ClassroomType[];
  class?: ClassType;
  isLoading: boolean;
};

const initialState: ClassroomInitialStateType = {
  classes: [],
  isLoading: true,
};

const slice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setClasses(state, action: PayloadAction<ClassroomType[]>) {
      state.classes = action.payload;
    },
    setClass(state, action: PayloadAction<ClassType>) {
      state.class = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {} = slice.actions;

export const fetchClassesList = createAsyncThunk<any>(
  "classroom/fetchClasses",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.fetchClasses();
      dispatch(slice.actions.setClasses(res.data.classesList));
    } catch (e) {
      dispatch(slice.actions.setClasses(testClasses));
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const fetchClass = createAsyncThunk<any, number>(
  "classroom/fetchClasses",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.fetchClass(id);
      dispatch(slice.actions.setClass(res.data.class));
    } catch (e) {
      dispatch(slice.actions.setClass(testClass));
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const addClassThunk = createAsyncThunk<any, AddClassRequestType>(
  "classroom/addClassThunk",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.addClass(data);
      dispatch(slice.actions.setClasses(res.data.classesList));
    } catch (e) {
      dispatch(
        slice.actions.setClasses([
          ...testClasses,
          { id: Math.floor(Math.random()), title: data.title },
        ]),
      );
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const classroomReducer = slice.reducer;
