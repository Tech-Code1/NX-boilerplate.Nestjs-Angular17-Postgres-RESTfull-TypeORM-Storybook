import { User, UsersProjects } from '@db/entities';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, UsersProjects])],
  providers: [UsersService, UsersResolver],
  controllers: [],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
