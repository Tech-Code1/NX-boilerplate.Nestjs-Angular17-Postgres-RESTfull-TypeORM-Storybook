export const LOGIN_USER = `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        email
        username
        isActive
        isBlocked
        roles
      }
    }
  },
`;

export const RESET_PASS = `
  mutation Password_Change($userId: ID!, $token: String!, $password: String!) {
    Password_Change(userId: $userId, token: $token, password: $password) {
      message
    }
  },
`;
