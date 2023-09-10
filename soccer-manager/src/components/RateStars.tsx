import { Slider } from "@mui/material";
import StarsGenerator from "./StarsGenerator";

interface IProps {
  value: number;
  setValue: (val: number) => void;
}

function RateStars({ value, setValue }: IProps) {
  const handleChange = (_: Event, val: number | number[]) => {
    setValue(val as number);
  };

  return (
    <Slider
      min={1}
      max={5}
      step={1}
      value={value}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => <StarsGenerator numberOfStars={value} />}
      sx={{
        marginTop: "1rem",
      }}
      onChange={handleChange}
    />
  );
}

export default RateStars;
