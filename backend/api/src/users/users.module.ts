import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, UsersProjects } from '@db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersProjects])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
