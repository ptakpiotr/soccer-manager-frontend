import React from "react";
import MonthButton from "./MonthButton";
import { MdArrowBack } from "react-icons/md";

function PrevMonthButton() {
  return (
    <div>
      <MonthButton>
        <MdArrowBack />
      </MonthButton>
    </div>
  );
}

export default PrevMonthButton;
