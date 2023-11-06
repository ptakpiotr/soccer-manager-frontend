import PlayerView from "../components/Player/PlayerView";
import { useParams } from "react-router-dom";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_PLAYER } from "../GraphQL/Queries/playerQueries";
import { IPlayerInfo } from "../Types";
import NoData from "../components/misc/NoData";

function Player() {
  const { id } = useParams();
  const { data, loading } = useGQLQuery<{ players: { nodes: IPlayerInfo[] } }>(
    GET_PLAYER,
    {
      variables: {
        playerId: id,
      },
      pollInterval: 3600000,
    }
  );

  return (
    <main>
      {id && !loading && data && data.players?.nodes?.length > 0 ? (
        <PlayerView {...data.players?.nodes[0]} />
      ) : (
        <NoData />
      )}
    </main>
  );
}

export default Player;
