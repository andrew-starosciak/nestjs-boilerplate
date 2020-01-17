import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5531,
    username: 'root',
    password: 'toor',
    database: 'boilerplate',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: false, // Set to false since we are using migrations
    // TODO: Fix migrations location to use typescript.
    // Not perfect since we have to run dev environment before we can access the migrations :(
    migrationsRun: true, // Run migrations automatically, we can disable to run manually.
    migrations: ['dist/migrations/*.migration.js'],
    cli: {
        migrationsDir: 'dist/migrations',
    },
    logging: 'all',
};

export = config;
