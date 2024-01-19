import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../app/path";
import CorrespondenceGame from "./correspondence-game/ui/correspondence-game";
import SentenceGame from "./sentence-game/ui/sentence-game";
import Login from "../entities/login/ui/login";
import Root from "../entities/root/root";
import Profile from "../entities/user/ui/profile";
import SpeakingGame from "./speaking-game/ui/speaking-game";
import LessonMenu from "./lessons-menu/ui/lesson-menu/lesson-menu";
import CreateLesson from "../entities/ classroom/ui/create-lesson/create-lesson";
import Classroom from "../entities/ classroom/ui/ classroom";
import EditClass from "../entities/ classroom/ui/edit-class/edit-class";
import LessonsList from "../entities/ classroom/ui/lessons-list/lessons-list";
import LessonResults from "../entities/ classroom/ui/lesson-results/lesson-results";
import PoemReading from "./poem-reading/ui/poem-reading";
import ReadingText from "./text-reading/ui/text-reading";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUserData } from "../app/store/selectors";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { setLessonId } from "./lessons-menu/bll/lessonReducer";
import Landing from "./landing/ui/landing";
import LessonsMenu from "./lessons-menu/ui/lessons-menu";
import { authUserPing } from "../entities/user/bll/userReducer";
import { AppDispatch } from "../app/store/store";

export const Routing = () => {
  const user = useSelector(getUserData);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const lessonId = new URLSearchParams(location.search).get("lessonId");

  useEffect(() => {
    if (lessonId) {
      dispatch(setLessonId(+lessonId));
    }
    dispatch(authUserPing());
  }, []);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path={"/"} element={<Root />}>
          <Route index element={<Landing />} />
          <Route path={`${path.lesson}/:id`} element={<LessonMenu />} />
        </Route>
        <Route path={path.login} element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={"/"} element={<Root />}>
        <Route
          index
          element={
            user && user.role === "student" ? <LessonsMenu /> : <Classroom />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path={path.correspondence} element={<CorrespondenceGame />} />
        <Route path={path.sentence} element={<SentenceGame />} />
        <Route path={path.profile} element={<Profile />} />
        <Route path={path.speaking} element={<SpeakingGame />} />
        <Route path={path.createLesson} element={<CreateLesson />} />
        <Route
          path={`${path.createLesson}/:lessonId`}
          element={<CreateLesson />}
        />
        <Route path={path.classroom} element={<Classroom />} />
        <Route path={`${path.editClass}/:id`} element={<EditClass />} />
        <Route path={`${path.lessonsList}/:id`} element={<LessonsList />} />
        <Route path={`${path.lesson}/:id`} element={<LessonMenu />} />
        <Route path={`${path.lessonResults}/:id`} element={<LessonResults />} />
        <Route path={path.poem} element={<PoemReading />} />
        <Route path={path.reading} element={<ReadingText />} />
      </Route>
      <Route path={path.login} element={<Login />} />
    </Routes>
  );
};
