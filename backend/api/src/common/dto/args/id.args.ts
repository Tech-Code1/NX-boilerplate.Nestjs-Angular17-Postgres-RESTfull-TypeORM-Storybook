import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdArgs {
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
