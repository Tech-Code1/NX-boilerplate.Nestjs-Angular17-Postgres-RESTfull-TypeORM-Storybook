import { ROLES } from '@db/constants';
import { User, UsersProjects } from '@db/entities';
import { HASH_SALT } from '@environments';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Resp } from '../utils/response.manager';
import { CreateUserDTO, UpdateUserDTO, UserToProjectDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>
  ) {}

  public async registerUser(registerUser: CreateUserDTO): Promise<User> {
    const { password } = registerUser;
    try {
      const newUser = await this.userRepository.create({
        ...registerUser,
        password: bcrypt.hashSync(password, HASH_SALT),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw Resp.Error('BAD_REQUEST', 'Something went wrong');
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
        throw Resp.Error('BAD_REQUEST', 'No result found');
      }
      return users;
    } catch (error) {
      throw Resp.Error(error.message);
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
        throw Resp.Error('NOT_FOUND', 'custom error message');
      }

      return user;
    } catch (error) {
      console.log(error, 'error');

      throw Resp.Error(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      Resp.Error('NOT_FOUND', {
        code: 'not_found::',
        detail: `No user found with the email ${email}`,
      });
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
        throw Resp.Error('NOT_FOUND');
      }
      return user;
    } catch (error) {
      throw Resp.Error(error);
    }
  }

  public async relationToProject(userToProject: UserToProjectDTO) {
    try {
      return await this.userProjectRepository.save(userToProject);
    } catch (error) {
      throw Resp.Error(error);
    }
  }

  public async findBy({
    key,
    value,
  }: {
    key: keyof CreateUserDTO;
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
      throw Resp.Error(error);
    }
  }

  public async updateUser(
    updateUser: UpdateUserDTO,
    upadateBy: User
  ): Promise<User> {
    const { id } = updateUser;
    try {
      const user = await this.userRepository.preload({
        ...updateUser,
        id,
      });

      user.lastUpdateBy = upadateBy;

      return this.userRepository.save(user);
    } catch (error) {
      throw Resp.Error(error);
    }
  }

  public async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.findUserById(id);

      user.isActive = false;
      user.deletedAt = new Date();

      return await this.userRepository.save(user);
    } catch (error) {
      throw Resp.Error(error);
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
