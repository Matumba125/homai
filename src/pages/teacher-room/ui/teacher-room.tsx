import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserData } from "../../../app/store/selectors";

const TeacherRoom = () => {
  const user = useSelector(getUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.status === "student") {
      navigate("/");
    }
  }, [user, navigate]);

  return <div></div>;
};

export default TeacherRoom;
