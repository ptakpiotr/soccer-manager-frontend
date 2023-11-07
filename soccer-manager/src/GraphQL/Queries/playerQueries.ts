import { gql } from "@apollo/client";

export const GET_PLAYERS_FOR_TRANSFERS = gql`
  query GetTransfers($teamId: UUID!) {
    transfers(teamId: $teamId) {
      id
      playerName
      playerRating
      age
      potentialRating
      marketValue
      wage
    }
  }
`;

export const GET_PLAYER = gql`
  query GetPlayer($playerId: UUID!) {
    players(first: 1, where: { id: { eq: $playerId } }) {
      nodes {
        id
        teamId
        currentTeamData: team {
          teamId: id
          teamLogo: logo {
            mainColor
            secondaryColor
            type
            iconId
          }
        }
        isBenched
        isInAcademy
        injuredTill
        suspended
        yellowCard
        isOnSale
        wage
        marketValue
        playerName
        contractTo
        age
        teamHistory {
          id
          team {
            teamName: name
          }
          teamId
          from
          to
        }
        playerRating
        potentialRating
        positionType
        playerNumber
        image
        condition
        countryCode
        foot
      }
    }
  }
`;

export const GET_TACTICS_PLAYERS = gql`
  query GetTacticsPlayer($teamId: UUID!) {
    players(
      first: 50
      where: { teamId: { eq: $teamId }, isInAcademy: { eq: false } }
    ) {
      nodes {
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
`;
