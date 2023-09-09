import { Months } from "../../Types";
import MonthButton from "./MonthButton";
import { MdArrowForward } from "react-icons/md";

interface IProps {
  month: Months;
  setMonth: React.Dispatch<React.SetStateAction<Months>>;
}

function NextMonthButton({ month, setMonth }: IProps) {
  const setNextMonth = () => {
    if (month === Months.DECEMBER) {
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
