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
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
    controllers: [UsersController],
    providers: [PostsService, ...postsProviders]
})
export class AppModule {}
