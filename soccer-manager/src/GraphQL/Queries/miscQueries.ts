import { gql } from "@apollo/client";

export const GET_SHIRTS = gql`
  query GetShirts($teamId: UUID!) {
    shirts(teamId: $teamId) {
      id
      mainColor
      secondaryColor
      isSecond
      type
    }
  }
`;

export const GET_TEAMVIEW = gql`
  query GetTeamView($teamId: UUID!) {
    teams(first: 1, where: { id: { eq: $teamId } }) {
      nodes {
        logo {
          id
          mainColor
          secondaryColor
          iconId
          type
        }
        name
        formation
        players {
          playerId: id
          squadPosition
          positionType
          playerName
          playerRating
          image
          isBenched
          injuredTill
          yellowCard
          suspended
          condition
          playerNumber
          team {
            formation
          }
        }
      }
    }
  }
`;
