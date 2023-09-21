import React from "react";
import style from "./profile-styles.module.scss";
import { Avatar } from "../../../shared/ui/avatar";
import { useSelector } from "react-redux";
import { getUserData } from "../../../app/store/selectors";

const Profile = () => {
  const user = useSelector(getUserData);

  return (
    <div className={style.profileWrapper}>
      <div className={style.profileInfo}>
        <div className={style.userInfoWrapper}>
          <h2>{user.username}</h2>
        </div>
        <div>
          <Avatar size={"m"} onClick={() => {}} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
