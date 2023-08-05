import React from "react";
import MonthButton from "./MonthButton";
import { MdArrowForward } from "react-icons/md";

function NextMonthButton() {
  return (
    <div>
      <MonthButton>
        <MdArrowForward />
      </MonthButton>
    </div>
  );
}

export default NextMonthButton;
