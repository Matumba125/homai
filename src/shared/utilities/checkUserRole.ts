import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/store/selectors";

export const useCheckStudentRole = () => {
  const navigate = useNavigate();
  const user = useSelector(getUserData);
  if (user && user.role !== "student") {
    navigate("/");
  }
  return;
};

export const useCheckTeacherRole = () => {
  const navigate = useNavigate();
  const user = useSelector(getUserData);
  if (user && user.role !== "teacher") {
    navigate("/");
  }
  return;
};
