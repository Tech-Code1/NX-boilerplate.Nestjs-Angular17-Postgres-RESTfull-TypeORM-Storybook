export const RECOVER_PASS = `
  mutation Recover($email: LoginEmail!) {
    login(loginInput: $loginInput) {
      user {
        email
      }
    }
  },
`;
