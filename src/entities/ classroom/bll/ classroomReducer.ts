import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddClassRequestType,
  ChangeStudentNameRequestType,
  ClassroomType,
  ClassType,
  LessonResults,
  StudentType,
  TeacherRoom,
  UpdateClassNameRequestType,
} from "../../../app/api/api";

export type ClassroomInitialStateType = {
  classes: ClassroomType[];
  class?: ClassType;
  isLoading: boolean;
  lessonResults?: LessonResults;
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
    setLessonResults(state, action: PayloadAction<LessonResults>) {
      state.lessonResults = action.payload;
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
      rejectWithValue(e);
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
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const fetchLessonResults = createAsyncThunk<any, number>(
  "classroom/fetchLessonResults",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const res = await TeacherRoom.fetchLessonResults(id);
      dispatch(slice.actions.setLessonResults(res.data.lessonResults));
    } catch (e) {
      rejectWithValue(e);
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
      rejectWithValue(e);
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
      rejectWithValue(e);
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
      rejectWithValue(e);
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
      rejectWithValue(e);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  },
);

export const classroomReducer = slice.reducer;
