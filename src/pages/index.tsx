import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../app/path";
import CorrespondenceGame from "./correspondence-game/ui/correspondence-game";
import SentenceGame from "./sentence-game/ui/sentence-game";
import Login from "../entities/login/ui/login";
import Root from "../entities/root/root";
import Profile from "../entities/user/ui/profile";
import SpeakingGame from "./speaking-game/ui/speaking-game";
import TeacherRoom from "./teacher-room/ui/teacher-room";

const Landing = lazy(() => import("./landing/ui/landing"));

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Root />}>
        <Route index element={<Landing />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path={path.correspondence} element={<CorrespondenceGame />} />
        <Route path={path.sentence} element={<SentenceGame />} />
        <Route path={path.profile} element={<Profile />} />
        <Route path={path.speaking} element={<SpeakingGame />} />
        <Route path={path.teacherRoom} element={<TeacherRoom />} />
      </Route>
      <Route path={path.login} element={<Login />} />
    </Routes>
  );
};
