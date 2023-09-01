import { User } from '@db/entities';

export class AuthResponse {
  token: string;

  user: User;
}
