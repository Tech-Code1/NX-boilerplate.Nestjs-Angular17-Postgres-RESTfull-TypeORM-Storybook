import { ROLES } from '@db/constants';
import { User, UsersProjects } from '@db/entities';
import { HASH_SALT } from '@environments';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthInput } from '../auth/dto/inputs/signup.input';
import { ErrorManager } from '../utils/error.manager';
import { UserToProjectArgs } from './dto/args';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>
  ) {}

  public async createUser(body: AuthInput): Promise<User> {
    try {
      return await this.userRepository.save({
        ...body,
        password: bcrypt.hashSync(body.password, HASH_SALT),
      });
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find({
        relations: {
          lastUpdateBy: true,
        },
      });

      if (users.length === 0) {
        throw ErrorManager.createError({
          type: 'BAD_REQUEST',
          message: 'No result found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  async findAllArgs(roles: ROLES[]): Promise<User[]> {
    if (!roles) return this.userRepository.find();

    return this.userRepository
      .createQueryBuilder()
      .where('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  public async findUserById(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw ErrorManager.createError({
          type: 'NOT_FOUND',
          message: 'custom error message',
        });
      }
      return user;
    } catch (error) {
      console.log(error, 'error');

      throw ErrorManager.createError(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      throw ErrorManager.createError(
        {
          code: '001',
          detail: `${email} not found`,
        },
        'NOT_FOUND'
      );
    }
  }

  public async findUserByIdWithProjects(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();

      if (!user) {
        throw ErrorManager.createError({ type: 'NOT_FOUND' });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  public async relationToProject(body: UserToProjectArgs) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createError(error);
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
      throw ErrorManager.createError(error);
    }
  }

  public async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
    upadateBy: User
  ): Promise<User> {
    try {
      const user = await this.userRepository.preload({
        ...updateUserInput,
        id,
      });

      user.lastUpdateBy = upadateBy;

      return this.userRepository.save(user);
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  public async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.findUserById(id);

      user.isActive = false;
      user.deletedAt = new Date();

      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  public async blockUser(
    id: string,
    timeBlocked: number,
    user: User
  ): Promise<User> {
    const userToBlock = await this.findUserById(id);
    const blockBy = await this.findUserById(user.id);

    userToBlock.isBlocked = true;
    userToBlock.timeBlocked = timeBlocked;
    userToBlock.lastUpdateBy = blockBy;

    return await this.userRepository.save(userToBlock);
  }
}
