import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { AUTH_REPOSITORY_TOKEN, DB_CONNECTION_TOKEN } from '../../common/index';

import { DatabaseModule } from '../database/index';
import { UsersModule } from '../users/index';

import { AuthEntity } from './auth.entity';

export const AuthProviders = [{
    provide: AUTH_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(AuthEntity),
    inject: [DB_CONNECTION_TOKEN]
}];

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
    ],
    providers: [
        ...AuthProviders,
    ],
})
export class AuthModule { }
