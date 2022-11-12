import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @ApiOperation({ summary: 'Обновление статуса пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Put('status')
    @UseGuards(AuthGuard('jwt'))
    updateUserStatus(@Body() body, @Request() req): Promise<User> {
        return this.userService.updateStatusUser(req.user.id, body.status);
    }

    @Post('avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('avatar'))
    uploadUserAvatar(@UploadedFile() avatar, @Request() req) {
        return this.userService.uploadAvatar(req.user.id, avatar);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.userService.findAllUsers();
    }

    @ApiOperation({ summary: 'Получить пользователя по id' })
    @ApiResponse({ status: 200, type: [User] })
    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.userService.findOneById(id);
    }

    // @ApiOperation({ summary: 'Получить пользователя по email' })
    // @Get('email/:email')
    // findOneByEmail(@Param('email') email: string) {
    //     return this.userService.findOneByEmail(email);
    // }
}
