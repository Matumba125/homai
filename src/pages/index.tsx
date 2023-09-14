import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../app/path";
import CorrespondenceGame from "./correspondence-game/ui/correspondence-game";
import SentenceGame from "./sentence-game/ui/sentence-game";

const TestPage = lazy(() => import("./landing/ui/landing"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path={path.correspondence} element={<CorrespondenceGame />} />
      <Route path={path.sentence} element={<SentenceGame />} />
    </Routes>
  );
};
