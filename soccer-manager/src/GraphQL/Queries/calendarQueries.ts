import { gql } from "@apollo/client";

export const GET_CALENDAR = gql`
  query GetCalendar($teamId: UUID!, $year: Int!, $month: Int!) {
    calendar(
      teamId: $teamId
      year: $year
      month: $month
      where: {
        match: {
          or: [{ homeTeamId: { eq: $teamId } }, { awayTeamId: { eq: $teamId } }]
        }
      }
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
      }
    }
  }
`;
