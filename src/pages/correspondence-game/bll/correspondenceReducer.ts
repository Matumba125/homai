import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Games } from "../../../app/api/api";
import _ from "lodash";

export type CorrespondenceTaskType = {
  id: number;
  word: string;
  image: string;
};

const testTasks = [
  {
    id: 1,
    word: "Эпл",
    image: "https://i-smart.by/image/unnamed%20(2).jpg",
  },
  {
    id: 2,
    word: "Солнце",
    image:
      "https://ar.culture.ru/attachments/attachment/preview/607432909eb28340d6a0380a-preview.jpg",
  },
  {
    id: 3,
    word: "Дерево",
    image: "https://flowertimes.ru/wp-content/uploads/2021/10/buk-derevo.jpg",
  },
  {
    id: 4,
    word: "Кот",
    image:
      "https://icdn.lenta.ru/images/2019/10/06/13/20191006135047104/square_1024_3615e7dc238cab977f9163550f2d8b6b.jpg",
  },
  {
    id: 5,
    word: "Собака",
    image:
      "https://www.m24.ru/b/d/nBkSUhL2hFcjn8u_Jb6BvMKnxdDs95C-yyqYy7jLs2KQeXqLBmmcmzZh59JUtRPBsdaJqSfJd54qEr7t1mNwKSGK7WY=xnWAvwsVI6FQXgqxOD3hYg.jpg",
  },
  {
    id: 6,
    word: "Книга",
    image: "https://rostislav.kiev.ua/wp-content/uploads/2014/04/kniga.jpg",
  },
  {
    id: 7,
    word: "Цветок",
    image: "https://florina.kh.ua/image/catalog/News/kamelija.jpg",
  },
  {
    id: 8,
    word: "Машина",
    image: "https://memchik.ru//images/memes/5ca20cacb1c7e377000268d3.jpg",
  },
  {
    id: 9,
    word: "Медведь",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Medved_mzoo.jpg/275px-Medved_mzoo.jpg",
  },
  {
    id: 10,
    word: "Поезд",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Diesel-multi-train_D1.jpg",
  },
  {
    id: 11,
    word: "Город",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/1_singapore_city_skyline_dusk_panorama_2011.jpg",
  },
  {
    id: 12,
    word: "Мяч",
    image: "https://ir.ozone.ru/s3/multimedia-t/c1000/6657390101.jpg",
  },
  {
    id: 13,
    word: "Конь",
    image:
      "https://thedifference.ru/wp-content/uploads/2013/09/chem-otlichaetsya-kon-ot-loshadi.jpg",
  },
  {
    id: 14,
    word: "Корабль",
    image:
      "https://ecoshp.ru/upload/resize_cache/webp/iblock/5d4/1644246378_1.webp",
  },
  {
    id: 15,
    word: "Велосипед",
    image: "https://ir.ozone.ru/s3/multimedia-k/c1000/6638589452.jpg",
  },
  {
    id: 16,
    word: "Дом",
    image: "https://cud.news/wp-content/uploads/2022/04/cud_news-panel.jpg",
  },
  {
    id: 17,
    word: "Лебедь",
    image: "https://4lapki.com/wp-content/uploads/2017/07/lened1.jpg",
  },
  {
    id: 18,
    word: "Рыба",
    image:
      "https://moya-planeta.ru/upload/images/xl/d6/e1/d6e1df0778fa565538370903d43af50349e8ad96.jpg",
  },
  {
    id: 19,
    word: "Луна",
    image:
      "https://icdn.lenta.ru/images/2023/08/20/03/20230820035553691/square_320_d27f1ffc0ba2e97141bd85b808df7730.jpg",
  },
  {
    id: 20,
    word: "Кровать",
    image:
      "https://stanwood.by/image/cache/catalog/products/drewood/Piastr/03d33d484ea0247a2b9882c711dcde15_1246x1278.2489284537-1024x1024.jpg",
  },
];

export type CorrespondenceInitialStateType = {
  tasks: CorrespondenceTaskType[];
  availableTasks: CorrespondenceTaskType[];
};

const initialState: CorrespondenceInitialStateType = {
  tasks: [],
  availableTasks: [],
};

const slice = createSlice({
  name: "correspondence",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<CorrespondenceTaskType[]>) {
      state.tasks = action.payload;
    },
    setAvailableTasks(state, action: PayloadAction<CorrespondenceTaskType[]>) {
      state.availableTasks = action.payload;
    },
    restartCorrespondenceTest(state) {
      state.availableTasks = state.tasks;
    },
    removeAvailableCorrespondenceTasks(state, action: PayloadAction<number[]>) {
      const tempArr = [...state.availableTasks];
      _.remove(tempArr, function (el) {
        return action.payload.indexOf(el.id) >= 0;
      });
      state.availableTasks = tempArr;
    },
  },
});

export const { removeAvailableCorrespondenceTasks, restartCorrespondenceTest } =
  slice.actions;

export const fetchCorrespondenceTasks = createAsyncThunk<any>(
  "correspondence/fetchTasks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await Games.getCorrespondenceTasks();
      dispatch(slice.actions.setTasks(res.data));
      dispatch(slice.actions.setAvailableTasks(res.data));
    } catch (e) {
      dispatch(slice.actions.setTasks(testTasks));
      dispatch(slice.actions.setAvailableTasks(testTasks));
      /*rejectWithValue(e);*/
    }
  },
);

export const correspondenceReducer = slice.reducer;
