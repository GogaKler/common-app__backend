import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

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

    public async login(user) {
        const token = await this.generateToken(user);
        return { token };
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
        console.log(enteredPassword, dbPassword);
        return await bcrypt.compare(enteredPassword, dbPassword);
    }
}
