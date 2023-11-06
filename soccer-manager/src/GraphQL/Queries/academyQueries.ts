import { gql } from "@apollo/client";

export const GET_ACADEMY_PLAYERS = gql`
  query GetAcademyPlayers($teamId: UUID!) {
    players(where: { teamId: { eq: $teamId }, age: { lt: 21 } }) {
      nodes {
        playerId: id
        playerName
        playerRating
        positionType
        image
        condition
        isBenched
        playerNumber
        isInAcademy
      }
    }
  }
`;

export const MANAGE_ACADEMY_PLAYERS = gql`
  mutation ManagePlayerAcademy($ids: [UUID!]!, $isInAcademy: Boolean!) {
    managePlayerAcademy(input: { ids: $ids, isInAcademy: $isInAcademy }) {
      playerIds
      errorMessage
    }
  }
`;
