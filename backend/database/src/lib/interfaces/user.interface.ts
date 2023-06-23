export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  roles: string[];
  isActive: boolean;
  isBlocked: boolean;
  timeBlocked: number;
}
