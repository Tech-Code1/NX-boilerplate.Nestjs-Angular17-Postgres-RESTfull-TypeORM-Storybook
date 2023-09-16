export interface IResetPassResponse {
  Password_Change: { message: string };
}
export interface IResetData {
  id: string;
  token: string;
  password: string;
}
