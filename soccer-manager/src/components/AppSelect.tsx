import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

export interface IProps<T> {
  value: T;
  elementName: string;
  label: string;
  handleChange: (event: SelectChangeEvent<T>, child: React.ReactNode) => void;
  elements: { value: T; desc?: string }[];
  style?: SelectProps["style"];
}

function AppSelect<T>({
  value,
  elementName,
  label,
  handleChange,
  elements,
  style,
}: IProps<T>) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${elementName}-label`}>{label}</InputLabel>
      <Select
        labelId={`${elementName}-label`}
        id={`${elementName}-select`}
        value={value}
        label={label}
        variant="filled"
        onChange={handleChange}
        style={style}
      >
        {elements.map((e) => (
          <MenuItem
            value={e.value as string}
            key={`${elementName}-${e.value}`}
          >{`${e.desc ? e.desc : e.value}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AppSelect;
