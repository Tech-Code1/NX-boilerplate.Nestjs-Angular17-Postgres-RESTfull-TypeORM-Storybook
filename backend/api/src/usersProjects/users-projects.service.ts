import { UsersProjects } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resp } from '../utils';

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
    console.log(userId);

    const result = await this.usersProjectsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'project'],
    });

    if (!result) {
      throw Resp.Error({
        type: 'BAD_REQUEST',
      });
    }

    if (Array.isArray(result) && result.length === 0) {
      throw Resp.Error('The user is not found in any project', 'NOT_FOUND');
    }

    return result;
  }
}
