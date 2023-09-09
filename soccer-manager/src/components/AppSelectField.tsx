import AppSelect, { IProps as AppSelectProps } from "./AppSelect";
import { FormControl, Typography } from "@mui/material";

interface IProps<T> extends AppSelectProps<T> {
  readonly notEditableValue: string;
  readonly isNotEditable?: boolean;
}

function AppSelectField<T>(props: IProps<T>) {
  const { notEditableValue, isNotEditable } = props;

  return (
    <FormControl>
      {!isNotEditable === true ? (
        <FormControl>
          <AppSelect {...props} />
        </FormControl>
      ) : (
        <Typography variant="subtitle1">{props.label} : {notEditableValue}</Typography>
      )}
    </FormControl>
  );
}

export default AppSelectField;
