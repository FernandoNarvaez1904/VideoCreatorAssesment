// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource } from 'typeorm';

const port: number = Number(process.env.PGPORT)
  ? Number(process.env.PGPORT)
  : 5432;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: port,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: true,
  entities: ['./src/entity/*.ts'],
  subscribers: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations_data',
});
