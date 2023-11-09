import { gql } from "@apollo/client";

export const ADD_TEAM = gql`
  mutation AddTeam(
    $userId: UUID!
    $firstMainColor: String!
    $firstSecondaryColor: String!
    $firstType: SoccerShirtType!
    $iconId: String!
    $logoMainColor: String!
    $logoSecondaryColor: String!
    $logoType: SoccerShirtType!
    $name: String!
    $secondMainColor: String!
    $secondSecondaryColor: String!
    $secondType: SoccerShirtType!
  ) {
    addTeam(
      input: {
        userId: $userId
        firstMainColor: $firstMainColor
        firstSecondaryColor: $firstSecondaryColor
        firstType: $firstType
        iconId: $iconId
        logoMainColor: $logoMainColor
        logoSecondaryColor: $logoSecondaryColor
        logoType: $logoType
        name: $name
        secondMainColor: $secondMainColor
        secondSecondaryColor: $secondSecondaryColor
        secondType: $secondType
      }
    ) {
      teamId
    }
  }
`;
