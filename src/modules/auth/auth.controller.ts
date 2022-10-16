import { Controller, Body, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('register')
    async register(@Body() user: UserDto) {
        return await this.authService.register(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async me(@Request() req) {
        return await this.authService.me(req.user.id);
    }
}
