import { IsString } from 'class-validator';

export class RequestPasswordResetResult {
  @IsString()
  message: string;
}
