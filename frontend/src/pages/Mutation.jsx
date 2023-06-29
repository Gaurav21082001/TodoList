import { gql } from "@apollo/client"
export const SIGNUP=gql`
mutation Signup($name:String!, $email:String! ,$password:String!){
    signup(input:{name:$name,email:$email,password:$password}){
        id
        name
        email
        password
    }
}
` ;

export const SIGNIN=gql`
mutation Signin($email:String!,$password:String!){
    signin(input:{email:$email,password:$password})
    {
    token
    }
  }
  `;

  export const CREATE_TASK=gql`
  mutation CreateTask($title:String!,$details:String!){
    createTask(input:{title:$title,details:$details})
    {
      id
      title
      details
    }
  }
  `;

  export const COMPLETE_TASK=gql`
  mutation CompleteTask($id:Float!){
    completeTask(id:$id){
      id
      title
      details
      isCompleted
    }
  }
  `;

  export const DELETE_TASK=gql`
  mutation DeleteTask($id:Float!){
    deleteTask(id:$id){
      title
    }
  }
  `;