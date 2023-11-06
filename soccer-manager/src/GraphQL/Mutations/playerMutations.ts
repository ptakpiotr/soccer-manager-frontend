import { gql } from "@apollo/client";

export const BUY_PLAYER = gql`
  mutation BuyPlayer($teamId: UUID!, $playerId: UUID!) {
    buyPlayer(teamId: $teamId, input: { id: $playerId }) {
      playerId
      errorMessage
    }
  }
`;

export const MANAGE_PLAYER_TRANSFER_STATUS = gql`
  mutation ManagePlayerTransferStatus($playerId: UUID!, $isOnSale: Boolean!) {
    managePlayerTransferStatus(input: { id: $playerId, isOnSale: $isOnSale }) {
      playerId
      errorMessage
    }
  }
`;

export const MODIFY_TEAM_TACTICS = gql`
  mutation ModifyTeamTactics(
    $teamId: UUID!
    $benchPlayers: [UUID!]!
    $squadPlayers: [PlayerTacticsPositionModelInput!]!
  ) {
    modifyTeamTactics(
      input: {
        teamId: $teamId
        benchPlayers: $benchPlayers
        squadPlayers: $squadPlayers
      }
    ) {
      teamId
      errorMessage
    }
  }
`;
