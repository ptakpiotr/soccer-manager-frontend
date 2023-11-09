import { Grid, TableCell, Button } from "@mui/material";
import { useState, useContext } from "react";
import { MdOpenInNew, MdMoney, MdDone, MdMinimize } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context";
import { useMutation as useGQLMutation } from "@apollo/client";
import { BUY_PLAYER } from "../../GraphQL/Mutations/playerMutations";
import { GET_PLAYERS_FOR_TRANSFERS } from "../../GraphQL/Queries/playerQueries";
import { IGeneralPayload } from "../../Types";
import { useMessageManager } from "../../hooks/useMessageManager";
interface IProps {
  readonly playerId: string;
}

function ActionCell({ playerId }: IProps) {
  const { teamId } = useContext(UserTokenContext);
  const [mutate] = useGQLMutation<{ buyPlayer: IGeneralPayload }>(BUY_PLAYER, {
    refetchQueries: [GET_PLAYERS_FOR_TRANSFERS],
  });

  const [buyingSure, setBuyingSure] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const navigate = useNavigate();

  const notify = useMessageManager();

  const openInNew = () => {
    navigate(`/player/${playerId}`);
  };

  const handleMoneyClick = () => {
    setBuyingSure([true, false]);
  };

  const handleApprovalClick = async () => {
    setBuyingSure([true, true]);

    const { data: buyData, errors: buyErrors } = await mutate({
      variables: {
        teamId,
        playerId,
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

  const handleCancelClick = () => {
    setBuyingSure([false, false]);
  };

  return (
    <TableCell>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button color="secondary" onClick={openInNew}>
          <MdOpenInNew />
        </Button>
        {!buyingSure[0] ? (
          <>
            <Button color="info" onClick={handleMoneyClick}>
              <MdMoney />
            </Button>
          </>
        ) : (
          <>
            <Button color="success" onClick={handleApprovalClick}>
              <MdDone />
            </Button>
            <Button color="error" onClick={handleCancelClick}>
              <MdMinimize />
            </Button>
          </>
        )}
      </Grid>
    </TableCell>
  );
}

export default ActionCell;
