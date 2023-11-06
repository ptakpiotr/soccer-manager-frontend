import { useContext } from "react";
import { GET_PLAYERS_FOR_TRANSFERS } from "../GraphQL/Queries/playerQueries";
import TransfersView from "../components/Transfers/TransfersView";
import { useQuery as useGQLQuery } from "@apollo/client";
import { UserTokenContext } from "../context";
import { IPlayerTransfers } from "../Types";
import Loading from "../components/misc/Loading";
function Transfers() {
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<IPlayerTransfers>(
    GET_PLAYERS_FOR_TRANSFERS,
    {
      pollInterval: 3600000,
      variables: {
        teamId,
      },
    }
  );

  return (
    <main>
      {!loading && data ? (
        <TransfersView players={data.transfers} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Transfers;
