import { useContext, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import RateStars from "./RateStars";
import { useMutation as useGQLMutation } from "@apollo/client";
import { ADD_OPINION } from "../GraphQL/Mutations/miscMutations";
import { UserTokenContext } from "../context";
import { IGeneralPayload } from "../Types";
import { useErrorMessageManager } from "../hooks/useErrorMessageManager";

function RateGame() {
  const [opinion, setOpinion] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const { userId } = useContext(UserTokenContext);
  const notify = useErrorMessageManager();

  const [mutate, { data, error }] = useGQLMutation<{
    addOpinion: IGeneralPayload;
  }>(ADD_OPINION, {
    variables: {
      userId,
      opinion,
      rating,
    },
  });

  const handleSupply = async () => {
    await mutate();

    if (error) {
      notify("An error has occured", "error");
    } else if (data?.addOpinion.errorMessage) {
      notify(data?.addOpinion.errorMessage, "error");
    } else {
      notify("Successfully added opinion", "success");
    }
  };

  return (
    <Grid container flexDirection={"row"} rowGap={"1rem"}>
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
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSupply}>
          Supply
        </Button>
      </Grid>
    </Grid>
  );
}

export default RateGame;
