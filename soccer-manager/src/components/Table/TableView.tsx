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
import { ITableTeamInfo } from "../../Types";
import Enumerable from "linq";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLazyQuery as useLazyGQLQuery } from "@apollo/client";
import SortableTableCell from "./SortableTableCell";
import RecentForm from "./RecentForm";
import NoData from "../misc/NoData";
import { GET_LEAGUE_TABLE } from "../../GraphQL/Queries/leagueQueries";

interface IProps {
  leagueId?: string;
}

type SingleScore = ITableTeamInfo["scores"][0];

function TableView({ leagueId }: IProps) {
  const [teams, setTeams] = useState<ITableTeamInfo>();
  const [orderBy, setOrderBy] = useState<keyof SingleScore>("points");
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  const navigate = useNavigate();

  const [getLeagueTable, _] = useLazyGQLQuery<{ league: ITableTeamInfo }>(
    GET_LEAGUE_TABLE,
    {
      variables: {
        leagueId,
      },
      pollInterval: 3600000 * 6,
    }
  );

  useEffect(() => {
    if (leagueId) {
      loadLeagueData()
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    setTeams((t) => {
      if (t && t.scores) {
        var enumerable = Enumerable.from(t.scores);

        if (sortAscending) {
          return {
            ...t,
            scores: enumerable.orderBy((e) => e[orderBy]).toArray(),
          };
        } else {
          return {
            ...t,
            scores: enumerable.orderByDescending((e) => e[orderBy]).toArray(),
          };
        }
      }
      return t;
    });
  }, [orderBy, sortAscending]);

  const loadLeagueData = async () => {
    const { data, loading } = await getLeagueTable();

    if (!loading && data) {
      setTeams(data.league);
    }
  };

  const handleClick = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

  return leagueId && teams && teams?.scores?.length > 0 ? (
    <>
      <Typography variant="h6">{teams.name}</Typography>
      <TableContainer>
        <Table className="league-table-view">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              {Object.keys(teams?.scores[0])
                .filter((k) => k !== "id" && k !== "form" && k !== "teamColor")
                .map((key) => (
                  <SortableTableCell
                    key={key}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    prop={key as keyof SingleScore}
                    sortAscending={sortAscending}
                    setSortAscending={setSortAscending}
                  />
                ))}
              <TableCell>Form</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.scores?.map((t) => (
              <TableRow key={`team-${t.team.id}`}>
                <TableCell>{teams.scores.indexOf(t) + 1}</TableCell>
                <TableCell
                  sx={{
                    backgroundColor: t.team.logo.mainColor,
                    display: "flex",
                  }}
                >
                  <Typography flex={1}>{t.team.name}</Typography>
                  <span
                    className="table-open-new"
                    onClick={() => {
                      handleClick(t.team.id);
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
  ) : (
    <NoData />
  );
}

export default TableView;
