import { useContext } from "react";
import TableView from "./TableView";
import { UserTokenContext } from "../../context";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_LEAGUE_ID } from "../../GraphQL/Queries/leagueQueries";
import Loading from "../misc/Loading";

function MiniTableView() {
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{ leagueId?: string }>(GET_LEAGUE_ID, {
    variables: {
      teamId,
    },
    pollInterval: 3600000 * 48,
  });

  return !loading && data ? (
    <TableView leagueId={data.leagueId} miniTable={true} />
  ) : (
    <Loading />
  );
}

export default MiniTableView;
