import { USER_REPOSITORY } from '../../core/constants';
import { User } from './users.model';

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User
    }
];
