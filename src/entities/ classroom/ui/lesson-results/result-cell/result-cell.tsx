import React, { FC } from "react";
import style from "../../classroom.module.scss";

type ResultCellProps = {
  maxResult: number;
  studentResult?: number;
};

const ResultCell: FC<ResultCellProps> = ({ maxResult, studentResult }) => {
  return (
    <td className={maxResult === 0 ? style.grayCell : style.resultWrapper}>
      {maxResult > 0 &&
        (!!studentResult ? `${studentResult}/${maxResult}` : "-")}
    </td>
  );
};

export default ResultCell;
