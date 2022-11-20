import { Controller, Body, Post, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Public } from '../../core/decorators/public';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Request() req) {
        const { user } = req;
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
        const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(
            user.id
        );

        await this.userService.setCurrentRefreshToken(refreshToken, user.id);

        req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return user;
    }

    @Post('logout')
    async logout(@Req() req) {
        await this.userService.removeRefreshToken(req.user.id);
        req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    }

    @UseGuards(DoesUserExist)
    @Public()
    @Post('register')
    async register(@Body() user: UserDto) {
        return await this.authService.register(user);
    }

    @Get('me')
    async me(@Request() req) {
        return await this.authService.me(req.user.id);
    }

    @UseGuards(JwtRefreshGuard)
    @Public()
    @Get('refresh')
    refresh(@Req() request) {
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    }
}
