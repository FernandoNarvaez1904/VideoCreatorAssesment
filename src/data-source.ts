import { DataSource } from 'typeorm';

const port: number = Number.isInteger(process.env['DATABASE_PORT'])
  ? Number(process.env['DATABASE_PORT'])
  : 5432;

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: port,
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASS '],
  database: process.env['DATABASE_NAME  '],
  logging: true,
  entities: ['./src/entity/*.ts'],
  subscribers: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations_data',
});
