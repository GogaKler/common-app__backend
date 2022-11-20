import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';
import { FilesService } from '../files/files.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        private fileService: FilesService
    ) {}

    async setCurrentRefreshToken(refreshToken: string, userId: number): Promise<any> {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update<User>(
            { currentHashedRefreshToken },
            {
                where: { id: userId }
            }
        );
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.findOneById(userId);

        console.log(refreshToken, userId);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

        if (isRefreshTokenMatching) {
            return user;
        }
    }

    async removeRefreshToken(userId: number) {
        return this.userRepository.update(
            { currentHashedRefreshToken: null },
            {
                where: { id: userId }
            }
        );
    }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findAllUsers() {
        return await this.userRepository.findAll<User>({
            attributes: { exclude: ['password'] }
        });
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne<User>({
            where: { id },
            attributes: { exclude: ['password'] }
        });

        if (user) {
            return user;
        }

        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { email },
            attributes: { exclude: ['password'] }
        });
    }

    async updateStatusUser(id: number, status: string): Promise<User> {
        const [numberOfAffectedRows, [updatedStatus]] = await this.userRepository.update<User>(
            { status },
            {
                where: { id },
                returning: true
            }
        );

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('Вы не имеете право менять этот статус');
        }

        return updatedStatus;
    }

    async uploadAvatar(id, avatar: any) {
        const fileName = await this.fileService.createFile(avatar);
        const [numberOfAffectedRows, [updatedAvatar]] = await this.userRepository.update(
            { avatar: fileName },
            {
                where: { id },
                returning: true
            }
        );

        console.log(numberOfAffectedRows);

        return updatedAvatar.avatar;
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
