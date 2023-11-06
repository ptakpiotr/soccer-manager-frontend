import { gql } from "@apollo/client";

export const GET_TEAM_SPENDINGS = gql`
  query GetTeamSpendings($teamId: UUID!) {
    teamSpendings(teamId: $teamId) {
      id
      transfers
      salaries
      season
    }
  }
`;

export const GET_TEAM_PROFITS = gql`
  query GetTeamProfits($teamId: UUID!) {
    teamProfits(teamId: $teamId) {
      id
      transfers
      stadium
      season
    }
  }
`;
