import { gql } from "@apollo/client";

export const GET_LEAGUE_ID = gql`
  query GetLeagueId($teamId: UUID!) {
    leagueId: teamLeagueId(teamId: $teamId)
  }
`;

export const GET_LEAGUE_TABLE = gql`
  query GetLeagueTable($leagueId: UUID!) {
    league(leagueId: $leagueId) {
      id
      name
      scores {
        points
        wins
        draws
        lost
        form
        team {
          id
          name
          logo {
            mainColor
          }
        }
      }
    }
  }
`;
