import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'typeorm';

import { DB_CONNECTION_TOKEN } from '../../common/index';

import { DatabaseModule } from '../database/index';

import { AuthenticationController } from './controllers/index';
import { jwtConstants, USER_REPOSITORY_TOKEN } from './constants/index';
import { UserEntity } from './entities/index';
import { AuthenticationService, UsersService, JwtStrategy } from './services/index';

/**
 * Provide all Entities to be connected to the Database.
 */
export const providers = [{
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: [DB_CONNECTION_TOKEN],
}];

@Module({
    controllers: [
        AuthenticationController,
    ],
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        PassportModule,
    ],
    providers: [
        ...providers,
        AuthenticationService,
        JwtStrategy,
        UsersService,
    ],
    exports: [],
})
export class AuthenticationModule { }
