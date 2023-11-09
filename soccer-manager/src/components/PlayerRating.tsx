import { MdStar } from "react-icons/md";
import { PlayerRating as PlayerRatingType } from "../Types";
import { playerRatingSchema } from "../Validation";
import useYupObjectValidation from "../hooks/useYupObjectValidation";
import Enumerable from "linq";
import InvalidPropsComponent from "./InvalidPropsComponent";
import { Grid } from "@mui/material";

function PlayerRating(props: PlayerRatingType) {
  const isRatingValid = useYupObjectValidation(props, playerRatingSchema);

  if (isRatingValid) {
    return (
      <Grid item>
        {Enumerable.range(0, props.rating)
          .toArray()
          .map((i) => (
            <MdStar color="gold" key={`star-${i}`} />
          ))}
      </Grid>
    );
  } else {
    return <InvalidPropsComponent />;
  }
}

export default PlayerRating;
