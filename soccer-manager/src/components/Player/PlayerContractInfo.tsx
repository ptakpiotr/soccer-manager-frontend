import { useMemo } from "react";
import { IContractInfo } from "../../Types";
import { List, ListItem } from "@mui/material";

type Props = Omit<IContractInfo, "id" | "playerId">;

function PlayerContractInfo({ marketValue, to, wage }: Props) {
  const currencyFormat = useMemo(
    () =>
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "EUR" }),
    []
  );

  return (
    <List className="player-contract-list">
      <ListItem className="player-contract-list-item">
        Market value: {currencyFormat.format(marketValue)}
      </ListItem>
      <ListItem className="player-contract-list-item">
        Wage: {currencyFormat.format(wage)}
      </ListItem>
      <ListItem className="player-contract-list-item">
        To: {to.toLocaleDateString()}
      </ListItem>
    </List>
  );
}

export default PlayerContractInfo;
