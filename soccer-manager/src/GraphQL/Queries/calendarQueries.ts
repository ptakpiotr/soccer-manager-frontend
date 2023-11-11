import { gql } from "@apollo/client";

export const GET_CALENDAR = gql`
  query GetCalendar($teamId: UUID!, $year: Int!, $month: Int!) {
    calendar(
      teamId: $teamId
      year: $year
      month: $month
      where: { eventType: { neq: NONE } }
    ) {
      id
      trainingId
      training {
        id
        trainingType
      }
      teamId
      description
      eventType
      year
      month
      day
      notEditable
      matchId
      match {
        homeTeamId
        awayTeamId
        ground
        homeScore
        awayScore
        type
        homeTeam {
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
  }
`;

export const GET_AVAILABLE_TEAMS = gql`
  query GetAvailableTeams($input: AvailableTeamsInput!) {
    availableTeams(input: $input) {
      value: id
      desc: name
    }
  }
`;
