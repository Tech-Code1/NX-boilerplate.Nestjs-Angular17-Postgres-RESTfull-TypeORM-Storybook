import { TYPEORM_CONFIG } from '@environments';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get(TYPEORM_CONFIG),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
