import { useContext } from "react";
import { GET_ACADEMY_PLAYERS } from "../GraphQL/Queries/academyQueries";
import AcademyView from "../components/Academy/AcademyView";
import { useQuery as useGQLQuery } from "@apollo/client";
import { UserTokenContext } from "../context";
import { IPlayerSquadInfo } from "../Types";
import Loading from "../components/misc/Loading";

function Academy() {
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{
    players: { nodes: IPlayerSquadInfo[] };
  }>(GET_ACADEMY_PLAYERS, {
    variables: {
      teamId,
    },
  });
  return <main>{!loading && data ? <AcademyView players={data.players.nodes}/> : <Loading />}</main>;
}

export default Academy;
