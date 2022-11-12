import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { FilesModule } from '../files/files.module';

@Module({
    providers: [UsersService, ...usersProviders],
    controllers: [UsersController],
    imports: [FilesModule],
    exports: [UsersService]
})
export class UsersModule {}
