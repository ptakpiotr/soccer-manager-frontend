import React from "react";
import MonthButton from "./MonthButton";
import { MdArrowBack } from "react-icons/md";
import { Months } from "../../Types";

interface IProps {
  month: Months;
  setMonth: React.Dispatch<React.SetStateAction<Months>>;
  setNewYear: (oldMonth: Months, newMonth: Months) => void;
}

function PrevMonthButton({ month, setMonth, setNewYear }: IProps) {
  const setPrevMonth = () => {
    if (month === Months.JANUARY) {
      setNewYear(Months.JANUARY, Months.DECEMBER);
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
