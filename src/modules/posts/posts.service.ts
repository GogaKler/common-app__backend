import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from '../../core/constants';
import { Post } from './posts.model';
import { PostDto } from './dto/posts.dto';
import { User } from '../users/users.model';

@Injectable()
export class PostsService {
    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) {}

    async create(post: PostDto, userId): Promise<Post> {
        // const user = await this.userService.findOneById(userId);
        // await postItem.$set('user', [user]);
        // postItem.user = [user];
        // TODO: Присылать пользователя вместе с созданным постом
        return await this.postRepository.create(
            { ...post, userId },
            {
                include: [{ model: User, attributes: { exclude: ['password'] } }]
            }
        );
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.findAll<Post>({
            include: [{ model: User, attributes: { exclude: ['password'] } }]
        });
    }

    async findOne(id): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }]
        });
    }

    async delete(id, userId) {
        return await this.postRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update(
            { ...data },
            { where: { id, userId }, returning: true }
        );

        return { numberOfAffectedRows, updatedPost };
    }
}
