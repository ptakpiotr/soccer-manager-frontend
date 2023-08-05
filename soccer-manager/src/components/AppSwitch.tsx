import { FormControlLabel, FormGroup, Switch } from "@mui/material";

interface IProps<T> {
  value?: T;
  desc: string;
  setValue: () => void;
}

function AppSwitch<T>({ value, desc, setValue }: IProps<T>) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={setValue} />}
        label={`${desc} | ${value}`}
      />
    </FormGroup>
  );
}

export default AppSwitch;
