import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentLessonId } from "../../app/store/selectors";
import { useNavigate } from "react-router";

export const useCheckLessonId = () => {
  const navigate = useNavigate();
  const lessonId = useSelector(getCurrentLessonId);

  useEffect(() => {
    if (!lessonId) {
      navigate(-1);
    }
  }, []);

  return;
};
