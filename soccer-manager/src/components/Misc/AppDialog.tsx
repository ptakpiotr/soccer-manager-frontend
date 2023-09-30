import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PropsWithChildren } from "react";

export interface IProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  dialogTitle: string;
  actions: {
    action: () => void;
    text: string;
  }[];
}

function AppDialog({
  isOpen,
  setIsOpen,
  dialogTitle,
  actions,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <Dialog
      maxWidth="md"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.map((a, i) => {
          return (
            <Button
              onClick={a.action}
              key={a.text}
              color={i === actions.length - 1 ? "error" : "success"}
            >
              {a.text}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}

export default AppDialog;
