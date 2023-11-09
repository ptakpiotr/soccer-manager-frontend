import { gql } from "@apollo/client";

export const ADD_OPINION = gql`
  mutation AddOpinion($userId: UUID!, $opinion: String!, $rating: Int!) {
    addOpinion(input: { userId: $userId, opinion: $opinion, rating: $rating }) {
      id
      errorMessage
    }
  }
`;
