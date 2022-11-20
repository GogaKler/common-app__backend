import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

export const appProviders = [
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard
    }
];
