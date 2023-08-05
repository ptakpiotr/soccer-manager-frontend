import { Slider } from "@mui/material";
import StarsGenerator from "./StarsGenerator";

function RateStars() {
  return (
    <Slider
      min={1}
      max={5}
      step={1}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => <StarsGenerator numberOfStars={value} />}
      sx={{
        marginTop: "1rem",
      }}
    />
  );
}

export default RateStars;
