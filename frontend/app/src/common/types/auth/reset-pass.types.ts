export interface IResetPassResponse {
  Password_Change: { message: string };
}
export interface IResetPass {
  password: string;
  repeatPass: string;
}
