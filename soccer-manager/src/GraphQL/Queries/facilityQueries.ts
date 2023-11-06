import { gql } from "@apollo/client";

export const GET_FACILITY = gql`
  query GetStadiumAndAcademy($userId: UUID!) {
    stadium: teamStadium(userId: $userId) {
      stadiumId
      stadiumName
      capacity
      seatQuality
      fansExtrasQuality
    }
    academy: teamAcademyFacility(userId: $userId) {
      academyId
      secondTeamName
      managerQuality
      facilitiesQuality
    }
  }
`;
