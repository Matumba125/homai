import axios from "axios";

const axiosLiveInstance = axios.create({
  withCredentials: true,
  baseURL: "https://neko-back.herokuapp.com/2.0/",
});

export const Games = {
  getCorrespondenceTasks: () => {
    return axiosLiveInstance
      .get("correspondenceTasks")
      .then((response) => response.data)
      .catch((e) => e);
  },
  getSentenceTasks: () => {
    return axiosLiveInstance
      .get("sentenceTasks")
      .then((response) => response.data)
      .catch((e) => e);
  },
};
