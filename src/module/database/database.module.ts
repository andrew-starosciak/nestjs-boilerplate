import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

import { DB_CONNECTION_TOKEN } from '../../common/index';

import * as config from './orm.config';

// Handle database tokens here. We currently only are using one db.
// Look up the tokens from the common module.
export const databaseProviders = [
    {
        provide: DB_CONNECTION_TOKEN,
        useFactory: async () =>
            await createConnection(config),
    },
];

// We are currently not utilizing or importing this but wanted to keep it here for reference
export function DatabaseOrmModule(): DynamicModule {
    // We could load the configuration from dotEnv here,
    // but typeORM cli would not be able to find the configuration file.
    return TypeOrmModule.forRoot(config);
  }

@Module({
    // We don't need to use this unless we change out from db provider injection tokens
    // import: [ DatabaseOrmModule() ]
    providers: [
        ...databaseProviders,
    ],
    exports: [
        ...databaseProviders,
    ],
})
export class DatabaseModule { }
