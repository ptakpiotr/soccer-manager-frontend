import { Button, Grid, Typography } from "@mui/material";
import CountryBox from "./CountryBox";
import PlayerInfoTable from "./PlayerInfoTable";
import { PositionType, SoccerShirtType } from "../../Types";
import "./player_view.scss";
import ShortPlayerInfoBar from "./ShortPlayerInfoBar";
import PlayerContractInfo from "./PlayerContractInfo";
import PlayerAdditionalInfo from "./PlayerAdditionalInfo";
import PlayerTeamHistory from "./PlayerTeamHistory";

interface IProps {
  id: string;
}

function PlayerView({ id }: IProps) {
  return (
    <Grid container flexDirection="row">
      <ShortPlayerInfoBar
        playerName="Test test"
        playerNumber={97}
        teamLogo={{
          mainColor: "#0000FF",
          secondaryColor: "#FF0000",
          type: SoccerShirtType.STRIPES_SIMPLE,
          name: "AFC",
          iconId: "gi-chicken",
        }}
      />
      <Typography variant="h6">General info</Typography>
      <Grid container flexDirection="row">
        <Grid item>
          <img
            className="player-view-img"
            src="https://robohash.org/test"
            loading="lazy"
          />
        </Grid>
        <Grid item flex={1} flexDirection="row">
          <CountryBox countryCode="CAN" />
          <Grid item maxWidth="200px">
            <PlayerInfoTable
              condition={89}
              foot="L"
              playerRating={{ rating: 2 }}
              potentialRating={{ rating: 5 }}
              positionType={PositionType.MIDFIELDER}
            />
          </Grid>
        </Grid>
        <Grid item>
          <PlayerContractInfo
            to={new Date()}
            marketValue={123123}
            wage={123123}
          />
        </Grid>
      </Grid>
      <Typography variant="h6">Additional info</Typography>
      <Grid container>
        <Grid flex={1} item>
          <PlayerAdditionalInfo
            age={22}
            injuredTill={new Date()}
            isBenched={false}
            suspended={false}
            yellowCard={true}
          />
        </Grid>
        <Grid item>
          <Button variant="contained">Put on transfer list</Button>
          <Button variant="contained">Offer contract</Button>
          <Typography variant="h6">Team history</Typography>
          <PlayerTeamHistory
            teamHistory={[
              {
                from: new Date(),
                to: undefined,
                id: "123",
                teamId: "123",
                teamName: "TEST",
              },
              {
                from: new Date(),
                to: new Date(),
                id: "123",
                teamId: "123",
                teamName: "TEST22",
              },
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PlayerView;
