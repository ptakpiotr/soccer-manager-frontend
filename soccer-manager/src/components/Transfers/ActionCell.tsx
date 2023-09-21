import { Grid, TableCell, Button } from "@mui/material";
import { useState } from "react";
import { MdOpenInNew, MdMoney, MdDone, MdMinimize } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface IProps {
  readonly playerId: string;
}

function ActionCell({ playerId }: IProps) {
  const [buyingSure, setBuyingSure] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const navigate = useNavigate();

  const openInNew = () => {
    navigate(`/player/${playerId}`);
  };

  const handleMoneyClick = () => {
    setBuyingSure([true, false]);
  };

  const handleApprovalClick = () => {
    setBuyingSure([true, true]);
    //TODO: make call here
  };

  const handleCancelClick = ()=>{
    setBuyingSure([false,false]);
  }

  return (
    <TableCell>
      <Grid container flexDirection="column" justifyContent="center" alignItems="center">
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
