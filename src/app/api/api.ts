import axios from "axios";
import {
  AuthDataType,
  UserDataType,
} from "../../entities/user/bll/userReducer";
import { CorrespondenceTaskType } from "../../pages/correspondence-game/bll/correspondenceReducer";
import { SentenceTaskType } from "../../pages/sentence-game/bll/sentenceReducer";

const axiosLiveInstance = axios.create({
  withCredentials: true,
  baseURL: "https://eng.aiteacher.ru/game/",
});

export const Games = {
  getCorrespondenceTasks: () => {
    return axiosLiveInstance.get<CorrespondenceTaskType[]>(
      "correspondenceTasks",
    );
  },
  getSentenceTasks: () => {
    return axiosLiveInstance.get<SentenceTaskType[]>("sentenceTasks");
  },
};

export const User = {
  getUser: (userId: number) => {
    return axiosLiveInstance.post<UserDataType>("user", userId);
  },
  updateUsername: (username: string) => {
    return axiosLiveInstance.put("user/username", { username });
  },
  updateAvatar: (image: File) => {
    const formData = new FormData();
    //@ts-ignore
    formData.append("image", image);
    return axiosLiveInstance.put("user/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const Auth = {
  login: (authData: AuthDataType) => {
    return axiosLiveInstance.post<UserDataType>("auth/login");
  },
};
