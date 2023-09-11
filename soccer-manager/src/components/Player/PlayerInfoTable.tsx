import { List, ListItem } from "@mui/material";
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
        Position:
        <span
          style={{
            color: Globals.functions.mapPositionTypeToColor(positionType),
          }}
        >
          {Globals.functions.mapPositionTypeToShortName(positionType)}
        </span>
      </ListItem>
      <ListItem className="player-info-list-item">
        Rating:
        <span>
          <PlayerRating rating={playerRating.rating} />
        </span>
      </ListItem>
      <ListItem className="player-info-list-item">
        Potential:
        <span>
          <PlayerRating rating={potentialRating.rating} />
        </span>
      </ListItem>
      <ListItem className="player-info-list-item">
        Foot:
        <span>{foot}</span>
      </ListItem>
      <ListItem className="player-info-list-item">Condition:</ListItem>
      <PlayerCondition condition={condition} />
    </List>
  );
}

export default PlayerInfoTable;
