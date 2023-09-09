import { Button } from "@mui/material";
import { PropsWithChildren } from "react";

interface IProps {
  setMonth: () => void;
}

function MonthButton({ children, setMonth }: PropsWithChildren<IProps>) {
  return (
    <Button color="secondary" onClick={setMonth}>
      {children}
    </Button>
  );
}

export default MonthButton;
