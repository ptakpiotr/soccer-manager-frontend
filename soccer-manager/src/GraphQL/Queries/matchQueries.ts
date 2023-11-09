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

export const GET_MATCH_EXPANDED = gql`
  query GetMatchExpanded($matchId: UUID!) {
    matches(id: $matchId) {
      homeTeamId
      awayTeamId
      homeScore
      awayScore
      homeTeam {
        name
        logo {
          mainColor
          secondaryColor
          iconId
          type
        }
      }
      awayTeam {
        name
        logo {
          mainColor
          secondaryColor
          iconId
          type
        }
      }
    }
  }
`;

export const GET_LATEST_MATCH = gql`
  query GetLatestMatch($teamId: UUID!) {
    latestMatch(teamId: $teamId) {
      matchId
    }
  }
`;
