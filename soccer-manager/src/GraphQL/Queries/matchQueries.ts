import { gql } from "@apollo/client";

export const GET_MATCH = gql`
  query GetMatch($matchId: UUID!) {
    matches(id: $matchId) {
      id
      homeTeamId
      awayTeamId
      ground
      homeScore
      awayScore
    }
  }
`;
