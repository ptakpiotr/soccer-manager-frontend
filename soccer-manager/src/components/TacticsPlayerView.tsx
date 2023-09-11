import {
  Badge,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { TbShirtFilled } from "react-icons/tb";

import FormationPlayerView from "./FormationPlayerView";
import { ViewVariant, ITacticsPlayerViewProps } from "../Types";
import PlayerRating from "./PlayerRating";
import Globals from "../Globals";
import { MdLocalHospital } from "react-icons/md";
import PlayerCondition from "./PlayerCondition";

type Props = ITacticsPlayerViewProps & {
  disableRipple?: boolean;
};

function TacticsPlayerView({
  positionType,
  playerName,
  playerRating,
  image,
  isBenched,
  injuredTill,
  yellowCard,
  suspended,
  condition,
  disableRipple,
}: Props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Badge
          badgeContent={injuredTill ? <MdLocalHospital /> : 0}
          color={"error"}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <FormationPlayerView
            id={"123"}
            image={image}
            positionType={positionType}
            variant={ViewVariant.SMALL}
            yellowCard={yellowCard}
            suspended={suspended}
            disableRipple={disableRipple}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemButton disableRipple={disableRipple}>
        <Grid container direction={"column"}>
          <Grid container direction={"column"}>
            <Grid item>{playerName}</Grid>
            <PlayerRating rating={playerRating.rating} />
            <Grid item>
              <PlayerCondition condition={condition} />
            </Grid>
          </Grid>
          <Grid container margin={"0.25rem"} justifyContent={"flex-end"}>
            <Grid item marginRight={"0.25rem"}>
              {Globals.functions.mapPositionTypeToShortName(positionType)}
            </Grid>
            <Grid item>
              {<TbShirtFilled color={isBenched ? "green" : "grey"} />}
            </Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}

export default TacticsPlayerView;
