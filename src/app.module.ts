import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PostsService } from './modules/posts/posts.service';
import { PostsModule } from './modules/posts/posts.module';
import { postsProviders } from './modules/posts/posts.providers';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule, AuthModule, PostsModule],
    controllers: [UsersController],
    providers: [PostsService, ...postsProviders]
})
export class AppModule {}
