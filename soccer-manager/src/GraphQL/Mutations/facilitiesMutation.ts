import { gql } from "@apollo/client";

export const ADD_STADIUM = gql`
  mutation AddStadium(
    $stadiumId: UUID!
    $capacity: Int!
    $fansExtrasQuality: Int!
    $seatQuality: Int!
    $stadiumName: String!
  ) {
    addStadium(
      input: {
        stadiumId: $stadiumId
        capacity: $capacity
        fansExtrasQuality: $fansExtrasQuality
        seatQuality: $seatQuality
        stadiumName: $stadiumName
      }
    ) {
      userId
      errorMessage
    }
  }
`;

export const EDIT_STADIUM = gql`
  mutation EditStadium(
    $stadiumId: UUID!
    $capacity: Int!
    $fansExtrasQuality: Int!
    $seatQuality: Int!
    $stadiumName: String!
  ) {
    editStadium(
      stadiumId: $stadiumId
      input: {
        capacity: $capacity
        fansExtrasQuality: $fansExtrasQuality
        seatQuality: $seatQuality
        stadiumName: $stadiumName
      }
    ) {
      userId
      errorMessage
    }
  }
`;

export const ADD_ACADEMY = gql`
  mutation AddAcademyFacility(
    $academyId: UUID!
    $facilitiesQuality: Int!
    $managerQuality: Int!
    $secondTeamName: String!
  ) {
    addAcademyFacility(
      input: {
        academyId: $academyId
        facilitiesQuality: $facilitiesQuality
        managerQuality: $managerQuality
        secondTeamName: $secondTeamName
      }
    ) {
      userId
      errorMessage
    }
  }
`;

export const EDIT_ACADEMY = gql`
  mutation EditAcademyFacility(
    $academyId: UUID!
    $facilitiesQuality: Int!
    $managerQuality: Int!
    $secondTeamName: String!
  ) {
    editAcademyFacility(
      academyId: $academyId
      input: {
        facilitiesQuality: $facilitiesQuality
        managerQuality: $managerQuality
        secondTeamName: $secondTeamName
      }
    ) {
      userId
      errorMessage
    }
  }
`;
