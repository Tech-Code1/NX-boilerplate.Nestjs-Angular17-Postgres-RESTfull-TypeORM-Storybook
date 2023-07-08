export const RECOVER_PASS = `
  mutation Password_Reset($email: String!) {
    Password_Reset(email: $email) {
      message
    }
  },
`;
