import { List, ListItem, Typography } from "@mui/material";
import { IPlayerTableInfo } from "../../Types";
import Globals from "../../Globals";
import PlayerRating from "../PlayerRating";
import PlayerCondition from "../PlayerCondition";

type Props = IPlayerTableInfo;

function PlayerInfoTable({
  foot,
  condition,
  playerRating,
  positionType,
  potentialRating,
}: Props) {
  return (
    <List className="player-info-list">
      <ListItem className="player-info-list-item">
        <Typography>
          Position:
          <span
            style={{
              color: Globals.functions.mapPositionTypeToColor(positionType),
            }}
          >
            {Globals.functions.mapPositionTypeToShortName(positionType)}
          </span>
        </Typography>
      </ListItem>
      <ListItem className="player-info-list-item">
        <Typography>
          Rating:
          <span>
            <PlayerRating rating={playerRating.rating} />
          </span>
        </Typography>
      </ListItem>
      <ListItem className="player-info-list-item">
        <Typography>
          Potential:
          <span>
            <PlayerRating rating={potentialRating.rating} />
          </span>
        </Typography>
      </ListItem>
      <ListItem className="player-info-list-item">
        <Typography>
          Foot:
          <span>{foot}</span>
        </Typography>
      </ListItem>
      <ListItem className="player-info-list-item">
        <Typography>Condition:</Typography>
      </ListItem>
      <PlayerCondition condition={condition} />
    </List>
  );
}

export default PlayerInfoTable;
