import { UsersProjects } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersProjectsService {
  constructor(
    @InjectRepository(UsersProjects)
    private readonly usersProjectsRepository: Repository<UsersProjects>
  ) {}

  public async findAll(): Promise<UsersProjects[]> {
    return await this.usersProjectsRepository.find({
      relations: ['user', 'project'],
    });
  }

  public async findProjectsByUser(userId: string): Promise<UsersProjects[]> {
    return await this.usersProjectsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'project'],
    });
  }
}
