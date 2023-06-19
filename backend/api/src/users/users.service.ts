import { User, UsersProjects } from '@db/entities';
import { HASH_SALT } from '@environments';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { UserArgs, UserToProjectArgs } from './dto/args';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>
  ) {}

  public async createUser(body: UserArgs): Promise<User> {
    try {
      body.password = bcrypt.hashSync(body.password, HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No result found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();

      if (!user) {
        console.log('entro en badrequest');

        throw new ErrorManager({
          type: 'NOT_FOUND',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async relationToProject(body: UserToProjectArgs) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async findBy({
    key,
    value,
  }: {
    key: keyof CreateUserInput;
    value: any;
  }) {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder()
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async updateUser(body: UpdateUserInput, id: string): Promise<User> {
    try {
      const findUser = await this.findUserById(id);

      if (findUser) {
        const user = await this.userRepository.preload(body);

        if (!user) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'Failed to update',
          });
        }

        return this.userRepository.save(user);
      }

      throw new ErrorManager({
        type: 'NOT_FOUND',
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async deleteUser(id: string): Promise<User> {
    try {
      let { isActive, deletedAt, ...user } = await this.findUserById(id);

      isActive = false;
      deletedAt = new Date();

      return { isActive, deletedAt, id, ...user };
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async blockUser(id: string): Promise<User> {
    throw new Error('Not implemented');
  }
}
