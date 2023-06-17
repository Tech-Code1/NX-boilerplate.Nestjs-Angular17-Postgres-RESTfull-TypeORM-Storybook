import { Users, UsersProjects } from '@db/entities';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, UsersProjects])],
  providers: [UsersService, UsersResolver],
  controllers: [],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
