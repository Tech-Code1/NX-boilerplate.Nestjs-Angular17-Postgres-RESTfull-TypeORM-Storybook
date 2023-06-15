import { Users, UsersProjects } from '@db/entities';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './service/users.service';
import { UsersResolver } from './users.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, UsersProjects])],
  providers: [UsersService, UsersResolver],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
