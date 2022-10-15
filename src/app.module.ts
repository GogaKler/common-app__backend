import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule],
    controllers: [AppController, UsersController],
    providers: [AppService]
})
export class AppModule {}
