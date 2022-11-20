import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public getCookieWithJwtAccessToken(userId: number) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
        });
        return `Authentication=${token}; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    }

    public getCookieWithJwtRefreshToken(userId: number) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
        });
        const cookie = `Refresh=${token}; Path=/; Max-Age=${this.configService.get(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
        )}`;
        return {
            cookie,
            token
        };
    }

    public getCookiesForLogOut() {
        return ['Authentication=; Path=/; Max-Age=0', 'Refresh=; Path=/; Max-Age=0'];
    }

    async validateUser(username: string, pass: string) {
        const userEmail = await this.userService.findOneByEmail_AUTH(username);
        const userLogin = await this.userService.findOneByLogin__AUTH(username);

        const user = userLogin ?? userEmail;

        if (!user) {
            return null;
        }

        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        const { ...result } = user['dataValues'];
        return result;
    }

    public async register(user: UserDto) {
        const pass = await this.hashPassword(user.password);

        const newUser = await this.userService.create({ ...user, password: pass });

        const { ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return { token };
    }

    public async me(id: number) {
        return await this.userService.findOneById(id);
    }

    private async generateToken(user) {
        return await this.jwtService.signAsync(user);
    }

    private async hashPassword(password) {
        return await bcrypt.hash(password, 5);
    }

    private async comparePassword(enteredPassword, dbPassword) {
        return await bcrypt.compare(enteredPassword, dbPassword);
    }
}
