import { IsOptional, Min } from 'class-validator';

export class PaginationArgs {
  @IsOptional()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @Min(1)
  limit: number = 10;
}
