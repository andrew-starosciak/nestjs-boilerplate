import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

export function config(configService: ConfigService) {
    return {
        type: configService.get<string>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: false, // Set to false since we are using migrations
        // TODO: Fix migrations location to use typescript.
        // Not perfect since we have to run dev environment before we can access the migrations :(
        // https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
        migrationsRun: true, // Run migrations automatically, we can disable to run manually.
        migrations: ['dist/migrations/*.migration.js'],
        cli: {
            migrationsDir: 'dist/migrations',
        },
        logging: 'all',
    } as ConnectionOptions;
}
