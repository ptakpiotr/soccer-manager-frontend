import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import RateStars from "./RateStars";
function RateGame() {
  const [opinion, setOpinion] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  return (
    <Grid container flexDirection={"row"}>
      <Grid item xs={5}>
        <TextField
          value={opinion}
          onChange={(e) => {
            setOpinion(e.target.value);
          }}
          variant="filled"
          label="Leave opinion"
          multiline
        />
      </Grid>
      <Grid item xs={6}>
        <RateStars value={rating} setValue={setRating} />
      </Grid>
    </Grid>
  );
}

export default RateGame;
