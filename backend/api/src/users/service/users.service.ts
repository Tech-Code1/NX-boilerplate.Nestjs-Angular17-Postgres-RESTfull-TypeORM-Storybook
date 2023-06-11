import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@db/entities';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) {}

    public async createUser(body: UserDTO): Promise<Users> {
        try {
            return await this.userRepository.save(body);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findUsers(): Promise<Users[]> {
        try {
            const users: Users[] = await this.userRepository.find();

            if(users.length === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No result found'
                })
            }
            return users;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findUserById(id: string): Promise<Users> {
        try {
            const user: Users = await this.userRepository
            .createQueryBuilder('user')
            .where({ id })
            .getOne();

            if(!user) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No result found'
                })
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userRepository.update(id, body);

            if(user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Failed to update'
                })
            }

            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error);
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id);

            if(user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Could not delete'
                })
            }

            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error);
        }
    }
}
