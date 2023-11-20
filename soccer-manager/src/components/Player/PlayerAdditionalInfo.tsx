import { IPlayerAdditionalInfo } from "../../Types";
import { Badge, List, ListItem } from "@mui/material";
import { MdLocalHospital } from "react-icons/md";
import { PiCardsFill } from "react-icons/pi";

type Props = Omit<IPlayerAdditionalInfo, "teamHistory">;

function PlayerAdditionalInfo({
  age,
  injuredTill,
  isBenched,
  suspended,
  yellowCard,
}: Props) {
  return (
    <List className="player-contract-list">
      <ListItem className="player-contract-list-item">Age: {age}</ListItem>
      <ListItem className="player-contract-list-item">
        Injured:
        {injuredTill ? (
          <Badge
            badgeContent={injuredTill ? <MdLocalHospital /> : 0}
            color={"error"}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            {new Date(injuredTill)?.toLocaleDateString()}
          </Badge>
        ) : (
          "false"
        )}
      </ListItem>
      <ListItem className="player-contract-list-item">
        Is on bench:
        {isBenched?.toString()}
      </ListItem>
      <ListItem className="player-contract-list-item">
        Suspended:
        {suspended ? <PiCardsFill color="tomato" fontSize="2rem" /> : "false"}
      </ListItem>
      <ListItem className="player-contract-list-item">
        Yellow card:
        {yellowCard ? <PiCardsFill color="yellow" fontSize="2rem" /> : "false"}
      </ListItem>
    </List>
  );
}

export default PlayerAdditionalInfo;
