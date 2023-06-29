import { useQuery, gql } from '@apollo/client';

export const GET_TASKS = gql`
  query Tasks{
    tasks{
      id
      title
      details
      isCompleted
    }
  }`;