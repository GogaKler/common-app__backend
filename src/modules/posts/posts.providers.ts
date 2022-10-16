import { POST_REPOSITORY } from '../../core/constants';
import { Post } from './posts.model';

export const postsProviders = [
    {
        provide: POST_REPOSITORY,
        useValue: Post
    }
];
