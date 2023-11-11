import { Months } from "../../Types";
import MonthButton from "./MonthButton";
import { MdArrowForward } from "react-icons/md";

interface IProps {
  month: Months;
  setMonth: React.Dispatch<React.SetStateAction<Months>>;
  setNewYear: (oldMonth: Months, newMonth: Months) => void;
}

function NextMonthButton({ month, setMonth, setNewYear }: IProps) {
  const setNextMonth = () => {
    if (month === Months.DECEMBER) {
      setNewYear(Months.DECEMBER, Months.JANUARY);
      setMonth(Months.JANUARY);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <div>
      <MonthButton setMonth={setNextMonth}>
        <MdArrowForward />
      </MonthButton>
    </div>
  );
}

export default NextMonthButton;
