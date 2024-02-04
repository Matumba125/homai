import React, { memo, useMemo } from "react";
import { Avatar as AvatarMui } from "@mui/material";
import { UserDataType } from "app/api/api";

type AvatarSize = "xs" | "s" | "m" | "l" | "xl";

interface AvatarProps {
  user?: UserDataType;
  onClick?: () => void;
  editable?: boolean;
  size?: AvatarSize;
  customSize?: number;
}

export const Avatar = memo(
  ({ user, onClick, editable, size, customSize }: AvatarProps) => {
    const avatar = user?.avatar;
    const username = user?.username;

    const xySize = useMemo(() => {
      if (customSize) {
        return `${customSize}px`;
      }
      switch (size) {
        case "xs":
          return "32px";
        case "s":
          return "64px";
        case "l":
          return "256px";
        case "xl":
          return "512px";
        default:
          return "128px";
      }
    }, [size, customSize]);

    const cursorType = useMemo(() => {
      if (onClick || editable) {
        return "pointer";
      }
      return "default";
    }, [onClick, editable]);

    const stringAvatar = useMemo(() => {
      if (!username) {
        return;
      }

      let initials;

      if (username) {
        initials = username.slice(0, 1).toUpperCase();
      } else {
        initials = "SU";
      }

      return {
        sx: {
          backgroundColor: "#0ba600",
          color: "rgb(229, 229, 229)",
          width: "40px",
          height: "40px",
          fontSize: `20px`,
          fontWeight: "500",
        },
        children: initials,
      };
    }, [username]);

    return (
      <>
        {avatar ? (
          <AvatarMui
            src={avatar}
            sx={{ width: xySize, height: xySize, cursor: cursorType }}
          />
        ) : (
          <AvatarMui {...stringAvatar} />
        )}
      </>
    );
  },
);
