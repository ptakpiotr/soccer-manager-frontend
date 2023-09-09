import React from "react";
import MonthButton from "./MonthButton";
import { MdArrowBack } from "react-icons/md";
import { Months } from "../../Types";

interface IProps {
  month: Months;
  setMonth: React.Dispatch<React.SetStateAction<Months>>;
}

function PrevMonthButton({ month, setMonth }: IProps) {
  const setPrevMonth = () => {
    if (month === Months.JANUARY) {
      setMonth(Months.DECEMBER);
    } else {
      setMonth((prev) => prev - 1);
    }
  };
  return (
    <div>
      <MonthButton setMonth={setPrevMonth}>
        <MdArrowBack />
      </MonthButton>
    </div>
  );
}

export default PrevMonthButton;
