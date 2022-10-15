import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UserDto } from './dto/user.dto';

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

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.userService.findAllUsers();
    }

    @ApiOperation({ summary: 'Получить пользователя по id' })
    @ApiResponse({ status: 200, type: [User] })
    @Get('id/:id')
    findOneById(@Param('id') id: number) {
        return this.userService.findOneById(id);
    }

    @ApiOperation({ summary: 'Получить пользователя по email' })
    @Get('email/:email')
    findOneByEmail(@Param('email') email: string) {
        return this.userService.findOneByEmail(email);
    }
}
