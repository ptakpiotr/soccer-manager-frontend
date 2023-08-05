import { Button } from "@mui/material";
import { PropsWithChildren } from "react";

function MonthButton({ children }: PropsWithChildren) {
  return <Button color="secondary">{children}</Button>;
}

export default MonthButton;
