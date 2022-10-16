import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model';
import { PostDto } from './dto/posts.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: PostModel })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostModel> {
        return await this.postService.create(post, req.user.id);
    }

    @Get()
    async findAll() {
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostModel> {
        const post = await this.postService.findOne(id);

        // Если поста нет => 404
        if (!post) {
            throw new NotFoundException('Пост не найден');
        }

        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostModel> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost } = await this.postService.update(id, post, req.user.id);

        // Если число 0 => Это значит, что пост не найден
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('Вы не имеете право изменять этот пост');
        }

        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.postService.delete(id, req.user.id);

        // Если число 0 => Это значит, что пост не найден
        if (deleted === 0) {
            throw new NotFoundException('Пост не существует');
        }

        return 'Success deleted';
    }
}
