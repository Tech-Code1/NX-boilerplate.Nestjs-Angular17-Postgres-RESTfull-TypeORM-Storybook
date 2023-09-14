export interface IResetPassResponse {
  Password_Change: { message: string };
}
export interface IResetData {
  userId: string;
  token: string;
  password: string;
}
