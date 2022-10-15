import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findAllUsers() {
        return await this.userRepository.findAll<User>({
            include: { all: true }
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: {
                email
            },
            include: {
                all: true
            }
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
