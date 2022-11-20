import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Refresh;
                }
            ]),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload) {
        const refreshToken = request.cookies?.Refresh;
        const user = this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);

        if (!user) {
            request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
            return await this.userService.removeRefreshToken(payload.userId);
        }

        return user;
    }
}
