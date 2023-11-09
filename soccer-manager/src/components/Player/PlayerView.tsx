import { Button, Grid, Typography } from "@mui/material";
import CountryBox from "./CountryBox";
import PlayerInfoTable from "./PlayerInfoTable";
import { IGeneralPayload, IPlayerInfo } from "../../Types";
import ShortPlayerInfoBar from "./ShortPlayerInfoBar";
import PlayerContractInfo from "./PlayerContractInfo";
import PlayerAdditionalInfo from "./PlayerAdditionalInfo";
import PlayerTeamHistory from "./PlayerTeamHistory";
import { useContext } from "react";
import { useMutation as useGQLMutation } from "@apollo/client";
import { UserTokenContext } from "../../context";
import {
  BUY_PLAYER,
  MANAGE_PLAYER_TRANSFER_STATUS,
} from "../../GraphQL/Mutations/playerMutations";
import {
  GET_PLAYER,
  GET_PLAYERS_FOR_TRANSFERS,
} from "../../GraphQL/Queries/playerQueries";
import "./player_view.scss";
import { useMessageManager } from "../../hooks/useMessageManager";

type Props = IPlayerInfo;

function PlayerView({
  id,
  age,
  condition,
  countryCode,
  currentTeamData,
  foot,
  image,
  playerName,
  playerNumber,
  playerRating,
  positionType,
  potentialRating,
  teamHistory,
  injuredTill,
  isBenched,
  suspended,
  yellowCard,
  marketValue,
  wage,
  isOnSale,
  contractTo,
}: Props) {
  const { teamId } = useContext(UserTokenContext);
  const [mutateBuy] = useGQLMutation<{
    buyPlayer: IGeneralPayload;
  }>(BUY_PLAYER, {
    refetchQueries: [GET_PLAYERS_FOR_TRANSFERS, GET_PLAYER],
  });
  const [mutateManage] = useGQLMutation<{
    managePlayerTransferStatus: IGeneralPayload;
  }>(MANAGE_PLAYER_TRANSFER_STATUS, {
    refetchQueries: [GET_PLAYERS_FOR_TRANSFERS, GET_PLAYER],
  });

  const notify = useMessageManager();

  const buyPlayer = async () => {
    const { data: buyData, errors: buyErrors } = await mutateBuy({
      variables: {
        teamId,
        playerId: id,
      },
    });

    if (buyData?.buyPlayer.errorMessage) {
      notify(buyData?.buyPlayer.errorMessage);
    } else if (buyErrors) {
      notify("An error has occured", "error");
    } else {
      notify("Player bought", "success");
    }
  };

  const managePlayerTransferStatus = async (transferStatus: boolean) => {
    const { data: manageData, errors: manageErrors } = await mutateManage({
      variables: {
        playerId: id,
        isOnSale: transferStatus,
      },
    });

    if (manageData) {
      notify(manageData?.managePlayerTransferStatus.errorMessage);
    } else if (manageErrors) {
      notify(manageErrors.join(","));
    } else {
      notify("Player managed", "success");
    }
  };

  return (
    <Grid container flexDirection="row">
      <ShortPlayerInfoBar
        playerName={playerName}
        playerNumber={playerNumber}
        teamLogo={{
          mainColor: currentTeamData.teamLogo.mainColor,
          secondaryColor: currentTeamData.teamLogo.secondaryColor,
          type: currentTeamData.teamLogo.type,
          name: "",
          iconId: currentTeamData.teamLogo.iconId,
        }}
      />
      <Typography variant="h6">General info</Typography>
      <Grid container flexDirection="row">
        <Grid item>
          <img className="player-view-img" src={image} loading="lazy" />
        </Grid>
        <Grid item flex={1} flexDirection="row">
          <CountryBox countryCode={countryCode} />
          <Grid item maxWidth="200px">
            <PlayerInfoTable
              condition={condition}
              foot={foot}
              playerRating={{ rating: playerRating }}
              potentialRating={{ rating: potentialRating }}
              positionType={positionType}
            />
          </Grid>
        </Grid>
        <Grid item>
          <PlayerContractInfo
            to={new Date(contractTo)}
            marketValue={marketValue}
            wage={wage}
          />
        </Grid>
      </Grid>
      <Typography variant="h6">Additional info</Typography>
      <Grid container>
        <Grid flex={1} item>
          <PlayerAdditionalInfo
            age={age}
            injuredTill={injuredTill}
            isBenched={isBenched}
            suspended={suspended}
            yellowCard={yellowCard}
          />
        </Grid>
        <Grid item>
          {teamId === currentTeamData.teamId ? (
            !isOnSale ? (
              <Button
                variant="contained"
                onClick={async () => {
                  await managePlayerTransferStatus(true);
                }}
              >
                Put on transfer list
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={async () => {
                  await managePlayerTransferStatus(false);
                }}
              >
                Remove from the transfer list
              </Button>
            )
          ) : (
            <></>
          )}
          {isOnSale && teamId !== currentTeamData.teamId ? (
            <Button variant="contained" onClick={buyPlayer}>
              Buy player
            </Button>
          ) : (
            <></>
          )}
          <PlayerTeamHistory teamHistory={teamHistory} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PlayerView;
