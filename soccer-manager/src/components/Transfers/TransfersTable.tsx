import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PlayerTransferType } from "../../Types";
import SortableTableCell from "../Table/SortableTableCell";
import Enumerable from "linq";
import PlayerRating from "../PlayerRating";
import ActionCell from "./ActionCell";

interface IProps {
  playerTransfers: PlayerTransferType[];
}

function isRatingProperty(
  k: keyof PlayerTransferType
): k is "playerRating" | "potentialRating" {
  return k === "playerRating" || k === "potentialRating";
}

function TransfersTable({ playerTransfers }: IProps) {
  const [orderBy, setOrderBy] =
    useState<keyof PlayerTransferType>("playerRating");
  const [sortAscending, setSortAscending] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerTransferType[]>(playerTransfers);

  const currencyFormat = useMemo(
    () =>
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }),
    []
  );

  useEffect(() => {
    setPlayers((t) => {
      var enumerable = Enumerable.from(t);

      if (sortAscending) {
        return enumerable
          .orderBy((e) => {
            if (isRatingProperty(orderBy)) {
              return e[orderBy];
            } else {
              return e[orderBy];
            }
          })
          .toArray();
      } else {
        return enumerable
          .orderByDescending((e) => {
            if (isRatingProperty(orderBy)) {
              return e[orderBy];
            } else {
              return e[orderBy];
            }
          })
          .toArray();
      }
    });
  }, [orderBy, sortAscending]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            {Object.keys(players[0])
              .filter((k) => k != "id" && k != "__typename")
              .map((key) => (
                <SortableTableCell
                  key={key}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  prop={key as keyof PlayerTransferType}
                  sortAscending={sortAscending}
                  setSortAscending={setSortAscending}
                />
              ))}
            <TableCell
              sx={{
                textAlign: "center",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((p) => (
            <TableRow key={`player-${p.id}`}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.playerName}</TableCell>
              <TableCell>
                <PlayerRating rating={p.playerRating} />
              </TableCell>
              <TableCell>{p.age}</TableCell>
              <TableCell>
                <PlayerRating rating={p.potentialRating} />
              </TableCell>
              <TableCell>{currencyFormat.format(p.marketValue)}</TableCell>
              <TableCell>{currencyFormat.format(p.wage)}</TableCell>
              <ActionCell playerId={p.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransfersTable;
