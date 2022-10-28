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

    async updateStatusUser(id: number, status: string) {
        const [numberOfAffectedRows, updatedStatus] = await this.userRepository.update(
            { status },
            {
                where: { id },
                returning: true
            }
        );

        console.log(numberOfAffectedRows, updatedStatus);

        return updatedStatus;
    }

    async findAllUsers() {
        return await this.userRepository.findAll<User>({
            attributes: { exclude: ['password'] }
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { email },
            attributes: { exclude: ['password'] }
        });
    }

    async findOneByLogin(name: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { name },
            attributes: { exclude: ['password'] }
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { id },
            attributes: { exclude: ['password'] }
        });
    }

    async findOneByEmail_AUTH(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { email }
        });
    }

    async findOneByLogin__AUTH(name: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { name }
        });
    }
}
