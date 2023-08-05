import { Alert, Badge, Grid } from "@mui/material";
import { IPlayerSquadInfo } from "../Types";
import DroppablePlayerView from "./DroppablePlayerView";
import { MdLocalHospital } from "react-icons/md";
interface IProps {
  playersInFormation?: IPlayerSquadInfo[];
}

function FormationView({ playersInFormation }: IProps) {
  return (
    <Grid container justifyContent={"center"} columnGap={"2rem"}>
      {playersInFormation ? (
        playersInFormation.map((p) => (
          <Grid key={p.playerId} item>
            <Badge
              badgeContent={p.playerRating.rating}
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
