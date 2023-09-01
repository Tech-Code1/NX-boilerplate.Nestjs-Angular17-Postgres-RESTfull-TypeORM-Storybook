import { IsString } from 'class-validator';

export class RequestPasswordChangeResult {
  @IsString()
  message: string;
}
