import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PostsService } from './modules/posts/posts.service';
import { PostsModule } from './modules/posts/posts.module';
import { postsProviders } from './modules/posts/posts.providers';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from './app.gateway';
import * as path from 'path';
import * as Joi from 'joi';
import { appProviders } from './app.providers';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required()
            })
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
            exclude: ['/api*']
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule
    ],
    exports: [AppGateway],
    controllers: [UsersController],
    providers: [PostsService, AppGateway, ...postsProviders, ...appProviders]
})
export class AppModule {}
