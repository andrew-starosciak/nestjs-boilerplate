# Database Module

We manage all ORM and database connections within this module. We export out our connections to consumer modules. We configure our database connections and their connections from here.

- Possibly refactor out the orm.config to not consume all entities as in the future not all entities could be in the same database.
- https://docs.nestjs.com/techniques/database
- https://docs.nestjs.com/recipes/sql-typeorm

## Migrations

- https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#migrations
- Code Example: https://github.com/ambroiseRabier/typeorm-nestjs-migration-example
- https://www.carloscaballero.io/part-5-clock-in-out-system-seed-database-and-migration-data/

## PostgreSQL

- https://www.postgresql.org/docs/12/datatype.html
- Cheatsheet: https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546