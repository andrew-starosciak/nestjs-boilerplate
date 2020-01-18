
const config = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: false, // Set to false since we are using migrations
    // TODO: Fix migrations location to use typescript.
    // Not perfect since we have to run dev environment before we can access the migrations :(
    // https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
    migrationsRun: false, // Run migrations automatically, we can disable to run manually.
    migrations: ['dist/migrations/*.migration.js'],
    cli: {
        migrationsDir: 'dist/migrations',
    },
    logging: 'all',
};

export = config;
