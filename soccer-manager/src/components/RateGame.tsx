import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import RateStars from "./RateStars";
function RateGame() {
  const [opinion, setOpinion] = useState<string>("");
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
        <RateStars />
      </Grid>
    </Grid>
  );
}

export default RateGame;
