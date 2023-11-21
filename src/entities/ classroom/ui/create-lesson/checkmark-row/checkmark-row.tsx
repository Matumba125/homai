import React, { ChangeEvent, FC } from "react";
import style from "../create-lesson.module.scss";

type CheckmarkRowPropsTypes = {
  checkmarkValue: boolean;
  handleCheckmarkChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: number;
  handleInputValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isDisabled: boolean;
};

const CheckmarkRow: FC<CheckmarkRowPropsTypes> = ({
  checkmarkValue,
  handleCheckmarkChange,
  inputValue,
  handleInputValueChange,
  label,
  isDisabled,
}) => (
  <div>
    <input
      className={style.checkmark}
      type="checkbox"
      checked={checkmarkValue}
      onChange={handleCheckmarkChange}
      disabled={isDisabled}
    />
    <label>{label}</label>
    <input
      type="number"
      value={inputValue}
      onChange={handleInputValueChange}
      disabled={isDisabled}
    />
  </div>
);

export default CheckmarkRow;
