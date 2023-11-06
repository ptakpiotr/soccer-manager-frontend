import { Alert, Badge, Grid } from "@mui/material";
import { IPlayerSquadInfo, PositionType } from "../Types";
import DroppablePlayerView from "./DroppablePlayerView";
import { MdLocalHospital } from "react-icons/md";
interface IProps {
  playersInFormation?: IPlayerSquadInfo[];
  positionType: PositionType;
}

function FormationView({ playersInFormation, positionType }: IProps) {
  return (
    <Grid
      className="formation-players-container"
      container
      justifyContent={"center"}
      columnGap={"2rem"}
    >
      {playersInFormation ? (
        playersInFormation.map((p) => (
          <Grid key={p.playerId} item>
            <Badge
              badgeContent={
                positionType === p.positionType ? p.playerRating : 1
              }
              color={"info"}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Badge
                badgeContent={p.injuredTill ? <MdLocalHospital /> : 0}
                color={"error"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <DroppablePlayerView {...p} />
              </Badge>
            </Badge>
          </Grid>
        ))
      ) : (
        <Alert severity="warning">
          No players for this formation were provided.
        </Alert>
      )}
    </Grid>
  );
}

export default FormationView;
