import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@db/entities';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) {}

    public async createUser(body: UserDTO): Promise<Users> {
        try {
            return await this.userRepository.save(body);
        } catch (err) {
            throw new Error(err);
        }
    }

    public async findUsers(body: UserDTO): Promise<Users[]> {
        try {
            return await this.userRepository.find();
        } catch (err) {
            throw new Error(err);
        }
    }

    public async findUserById(id: string): Promise<Users> {
        try {
            return await this.userRepository
            .createQueryBuilder('user')
            .where({ id })
            .getOne();
        } catch (err) {
            throw new Error(err);
        }
    }

    public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userRepository.update(id, body);

            if(user.affected === 0) {
                return undefined;
            }

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id);

            if(user.affected === 0) {
                return undefined;
            }

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
}
