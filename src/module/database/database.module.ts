import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';

import { DB_CONNECTION_TOKEN } from '../../common/index';

export const databaseProviders = [
    {
        provide: DB_CONNECTION_TOKEN,
        useFactory: async () =>
            await createConnection({
                type: 'postgres',
                host: 'localhost',
                port: 5531,
                username: 'root',
                password: 'toor',
                database: 'boilerplate',
                entities: [__dirname + '/../**/*.entity.{ts,js}'],
                synchronize: true,
                logging: 'all',
            }),
    },
];

@Module({
    providers: [
        ...databaseProviders,
    ],
    exports: [
        ...databaseProviders,
    ],
})
export class DatabaseModule { }
