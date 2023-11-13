import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddClassRequestType,
  ChangeStudentNameRequestType,
  TeacherRoom,
  UpdateClassNameRequestType,
} from "../../../app/api/api";

export type ClassroomType = {
  id: number;
  title: string;
};

export type StudentType = {
  id: number;
  classId: number;
  name: string;
  username: string;
  password: string;
};

export type ClassType = {
  id: number;
  title: string;
  studentsList: StudentType[];
};

const testClass: ClassType = {
  id: 1,
  title: "1 A",
  studentsList: [
    {
      id: 1,
      classId: 1,
      name: "Иванов",
      username: "Ivanov",
      password: "sadas",
    },
    {
      id: 2,
      classId: 1,
      name: "Петров",
      username: "Ivanov",
      password: "sadas",
    },
    {
      id: 3,
      classId: 1,
      name: "Сидоров",
      username: "Ivanov",
      password: "sadas",
    },
  ],
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
    changeStudentData(state, action: PayloadAction<StudentType>) {
      if (state.class) {
        const updatedStudentsList = state.class.studentsList.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, name: action.payload.name };
          }
          return student;
        });
        state.class.studentsList = updatedStudentsList;
      }
    },
    deleteStudent(state, action: PayloadAction<number>) {
      if (state.class) {
        const updatedStudentsList = state.class.studentsList.filter(
          (student) => student.id !== action.payload,
        );
        state.class.studentsList = updatedStudentsList;
      }
    },
    setUpdatedClassName(state, action: PayloadAction<string>) {
      if (state.class) {
        state.class.title = action.payload;
      }
    },
  },
});

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

export const changeStudentNameThunk = createAsyncThunk<
  any,
  ChangeStudentNameRequestType
>(
  "classroom/changeStudentNameThunk",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.changeStudentName(data);
      dispatch(slice.actions.changeStudentData(res.data));
    } catch (e) {
      dispatch(
        slice.actions.changeStudentData({
          id: data.studentId,
          classId: data.classId,
          name: data.newName,
          username: "Ivanov",
          password: "sadas",
        }),
      );
      console.error("Error changing student name:", e);
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const deleteStudentThunk = createAsyncThunk<any, number>(
  "classroom/deleteStudentThunk",
  async (studentId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      await TeacherRoom.deleteStudent(studentId);
      dispatch(slice.actions.deleteStudent(studentId));
    } catch (e) {
      dispatch(slice.actions.deleteStudent(studentId));
      console.error("Error deleting student:", e);
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const updateClassNameThunk = createAsyncThunk<
  any,
  UpdateClassNameRequestType
>(
  "classroom/updateClassNameThunk",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      await TeacherRoom.updateClassName({ ...data });
      dispatch(slice.actions.setUpdatedClassName(data.newName));
    } catch (e) {
      dispatch(slice.actions.setUpdatedClassName(data.newName));
      console.error("Error updating class name:", e);
      //rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const classroomReducer = slice.reducer;
