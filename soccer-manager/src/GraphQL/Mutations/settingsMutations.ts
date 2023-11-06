import { gql } from "@apollo/client";

export const EDIT_USER_PREFERENCES = gql`
  mutation EditUserPreferences(
    $userId: UUID!
    $bottomMenu: Boolean!
    $mode: String!
    $navbarColor: String!
  ) {
    editUserPreferences(
      userId: $userId
      input: { bottomMenu: $bottomMenu, mode: $mode, navbarColor: $navbarColor }
    ) {
      userId
      errorMessage
    }
  }
`;

export const ADD_USER_PREFERENCES = gql`
  mutation ADDUserPreferences(
    $userId: UUID!
    $bottomMenu: Boolean!
    $mode: String!
    $navbarColor: String!
  ) {
    addUserPreferences(
      input: {
        userId: $userId
        bottomMenu: $bottomMenu
        mode: $mode
        navbarColor: $navbarColor
      }
    ) {
      userId
      errorMessage
    }
  }
`;
