import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
