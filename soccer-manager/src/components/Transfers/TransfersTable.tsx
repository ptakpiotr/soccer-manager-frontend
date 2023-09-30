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

const playerTransfers: PlayerTransferType[] = [
  {
    id: "1",
    name: "John Smith",
    rating: { rating: 3 },
    age: 25,
    potentialRating: { rating: 4 },
    marketValue: 15000000,
    wage: 75000,
  },
  {
    id: "2",
    name: "Alice Johnson",
    rating: { rating: 4 },
    age: 28,
    potentialRating: { rating: 3 },
    marketValue: 18000000,
    wage: 85000,
  },
  {
    id: "3",
    name: "David Wilson",
    rating: { rating: 2 },
    age: 23,
    potentialRating: { rating: 5 },
    marketValue: 12000000,
    wage: 60000,
  },
  {
    id: "4",
    name: "Emily Brown",
    rating: { rating: 5 },
    age: 27,
    potentialRating: { rating: 4 },
    marketValue: 22000000,
    wage: 95000,
  },
  {
    id: "5",
    name: "Michael Davis",
    rating: { rating: 3 },
    age: 24,
    potentialRating: { rating: 4 },
    marketValue: 16000000,
    wage: 72000,
  },
];

function isRatingProperty(
  k: keyof PlayerTransferType
): k is "rating" | "potentialRating" {
  return k === "rating" || k === "potentialRating";
}

function TransfersTable() {
  const [orderBy, setOrderBy] = useState<keyof PlayerTransferType>("rating");
  const [sortAscending, setSortAscending] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerTransferType[]>(playerTransfers);

  const currencyFormat = useMemo(
    () =>
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "EUR" }),
    []
  );

  useEffect(() => {
    setPlayers((t) => {
      var enumerable = Enumerable.from(t);

      if (sortAscending) {
        return enumerable
          .orderBy((e) => {
            if (isRatingProperty(orderBy)) {
              return e[orderBy].rating;
            } else {
              return e[orderBy];
            }
          })
          .toArray();
      } else {
        return enumerable
          .orderByDescending((e) => {
            if (isRatingProperty(orderBy)) {
              return e[orderBy].rating;
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
              .filter((k) => k != "id")
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
              <TableCell>{p.name}</TableCell>
              <TableCell>
                <PlayerRating {...p.rating} />
              </TableCell>
              <TableCell>{p.age}</TableCell>
              <TableCell>
                <PlayerRating {...p.potentialRating} />
              </TableCell>
              <TableCell>{currencyFormat.format(p.marketValue)}</TableCell>
              <TableCell>{currencyFormat.format(p.wage)}</TableCell>
              <ActionCell playerId={"123"} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransfersTable;
