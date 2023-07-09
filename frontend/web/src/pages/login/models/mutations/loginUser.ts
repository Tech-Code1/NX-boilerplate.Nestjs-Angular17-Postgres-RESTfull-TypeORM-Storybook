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
  mutation Password_Reset($email: String!) {
    Password_Reset(email: $email) {
      message
    }
  },
`;
