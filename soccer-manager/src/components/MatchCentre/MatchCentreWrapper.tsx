import React from "react";
import { useQuery as useGQLQuery } from "@apollo/client";
import MatchCentreView from "./MatchCentreView";
import { IMatchCalendarInfo } from "../../Types";
import { GET_MATCH } from "../../GraphQL/Queries/matchQueries";
import Loading from "../misc/Loading";
interface IProps {
  matchId: string;
}

function MatchCentreWrapper({ matchId }: IProps) {
  const { data, loading } = useGQLQuery<{
    matches: Omit<IMatchCalendarInfo, "matchType">[];
  }>(GET_MATCH, {
    variables: {
      matchId,
    },
  });

  return !loading && data ? (
    <MatchCentreView {...data?.matches[0]} />
  ) : (
    <Loading />
  );
}

export default MatchCentreWrapper;
