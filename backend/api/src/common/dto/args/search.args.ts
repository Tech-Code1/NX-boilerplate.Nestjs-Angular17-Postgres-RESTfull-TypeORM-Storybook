import { IsOptional, IsString } from 'class-validator';
export class SearchArgs {
  @IsOptional()
  @IsString()
  search?: string;
}
