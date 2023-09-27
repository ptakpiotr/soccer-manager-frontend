import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GameResultType, ITableTeamInfo } from "../../Types";
import Enumerable from "linq";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SortableTableCell from "./SortableTableCell";
import RecentForm from "./RecentForm";

const teamsInfo: ITableTeamInfo[] = [
  {
    id: 1,
    name: "Igarapava",
    points: 22,
    wins: 83,
    draws: 21,
    lost: 34,
    teamColor: "#1c9a61",
    form: [
      GameResultType.WIN,
      GameResultType.LOST,
      GameResultType.WIN,
      GameResultType.DRAW,
      GameResultType.DRAW,
    ],
  },
  {
    id: 2,
    name: "Topory",
    points: 21,
    wins: 14,
    draws: 49,
    lost: 17,
    teamColor: "#7152d3",
  },
  {
    id: 3,
    name: "San Casimiro",
    points: 60,
    wins: 59,
    draws: 39,
    lost: 92,
    teamColor: "#56c74e",
  },
  {
    id: 4,
    name: "Boto",
    points: 37,
    wins: 54,
    draws: 49,
    lost: 1,
    teamColor: "#ffa90f",
  },
  {
    id: 5,
    name: "Keleleng",
    points: 92,
    wins: 91,
    draws: 71,
    lost: 7,
    teamColor: "#2c5785",
  },
  {
    id: 6,
    name: "Tauranga",
    points: 24,
    wins: 85,
    draws: 37,
    lost: 22,
    teamColor: "#77c5d7",
  },
  {
    id: 7,
    name: "Kuybyshevo",
    points: 28,
    wins: 73,
    draws: 35,
    lost: 43,
    teamColor: "#779423",
  },
  {
    id: 8,
    name: "Doug An",
    points: 11,
    wins: 90,
    draws: 85,
    lost: 44,
    teamColor: "#6a1600",
  },
  {
    id: 9,
    name: "Saltsjö-Boo",
    points: 71,
    wins: 36,
    draws: 45,
    lost: 87,
    teamColor: "#7b4464",
  },
  {
    id: 10,
    name: "Tønsberg",
    points: 42,
    wins: 9,
    draws: 54,
    lost: 79,
    teamColor: "#7bce21",
  },
  {
    id: 11,
    name: "Kanal",
    points: 86,
    wins: 19,
    draws: 86,
    lost: 94,
    teamColor: "#e239cb",
  },
  {
    id: 12,
    name: "Budakovo",
    points: 8,
    wins: 63,
    draws: 68,
    lost: 4,
    teamColor: "#d93400",
  },
  {
    id: 13,
    name: "Toroy",
    points: 8,
    wins: 21,
    draws: 69,
    lost: 95,
    teamColor: "#7e5165",
  },
  {
    id: 14,
    name: "Qukou",
    points: 93,
    wins: 60,
    draws: 57,
    lost: 24,
    teamColor: "#c1d9da",
  },
  {
    id: 15,
    name: "Anyu",
    points: 18,
    wins: 28,
    draws: 14,
    lost: 52,
    teamColor: "#bf5448",
  },
  {
    id: 16,
    name: "Huangjinjing",
    points: 10,
    wins: 94,
    draws: 29,
    lost: 82,
    teamColor: "#eba0f0",
  },
];

function TableView() {
  const [teams, setTeams] = useState<ITableTeamInfo[]>(teamsInfo);
  const [orderBy, setOrderBy] = useState<keyof ITableTeamInfo>("points");
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTeams((t) => {
      var enumerable = Enumerable.from(t);

      if (sortAscending) {
        return enumerable.orderBy((e) => e[orderBy]).toArray();
      } else {
        return enumerable.orderByDescending((e) => e[orderBy]).toArray();
      }
    });
  }, [orderBy, sortAscending]);

  const handleClick = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <>
      <Typography variant="h6">My league table</Typography>
      <TableContainer>
        <Table className="league-table-view">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              {Object.keys(teams[0])
                .filter((k) => k !== "id" && k !== "form" && k !== "teamColor")
                .map((key) => (
                  <SortableTableCell
                    key={key}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    prop={key as keyof ITableTeamInfo}
                    sortAscending={sortAscending}
                    setSortAscending={setSortAscending}
                  />
                ))}
              <TableCell>Form</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((t) => (
              <TableRow key={`team-${t.id}`}>
                <TableCell>{teams.indexOf(t) + 1}</TableCell>
                <TableCell
                  sx={{
                    backgroundColor: t.teamColor,
                    display: "flex",
                  }}
                >
                  <Typography flex={1}>{t.name}</Typography>
                  <span
                    className="table-open-new"
                    onClick={() => {
                      handleClick(t.id);
                    }}
                  >
                    <MdOpenInNew />
                  </span>
                </TableCell>
                <TableCell>{t.points}</TableCell>
                <TableCell>{t.wins}</TableCell>
                <TableCell>{t.draws}</TableCell>
                <TableCell>{t.lost}</TableCell>
                <TableCell>
                  {t.form ? <RecentForm results={t.form} /> : <></>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableView;
