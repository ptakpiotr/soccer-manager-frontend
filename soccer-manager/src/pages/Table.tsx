import { useContext } from "react";
import { GET_LEAGUE_ID } from "../GraphQL/Queries/leagueQueries";
import TableView from "../components/Table/TableView";
import { useQuery as useGQLQuery } from "@apollo/client";
import { UserTokenContext } from "../context";
import Loading from "../components/misc/Loading";

function Table() {
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{ leagueId?: string }>(GET_LEAGUE_ID, {
    variables: {
      teamId,
    },
    pollInterval: 3600000 * 48,
  });

  return (
    <main>
      {!loading && data ? <TableView leagueId={data.leagueId} /> : <Loading />}
    </main>
  );
}

export default Table;
