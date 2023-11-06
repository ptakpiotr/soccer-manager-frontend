import { gql } from "@apollo/client";

export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences($userId: UUID!) {
    userPreferences(userId: $userId) {
      mode
      bottomMenu
      navbarColor
    }
  }
`;
