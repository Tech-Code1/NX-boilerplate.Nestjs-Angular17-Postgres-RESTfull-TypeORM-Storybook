export const LOGIN_USER = `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        email
        username
        isActive
        isBlocked
        roles
      }
    }
  },
`;
