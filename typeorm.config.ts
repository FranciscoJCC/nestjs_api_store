import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';


//Enviroment
const env = process.env.NODE_ENV || 'dev';

dotenv.config({
  path: `.env.${env}`
})

/* CONECTION TO DB FOR MIGRATIONS */
export default new DataSource({
  type: 'postgres', //mysql
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [process.env.ENTITIES_DIR],
  migrations: [process.env.MIGRATIONS_DIR],
  migrationsTableName : process.env.TABLE_MIGRATIONS,
  synchronize: false,
  logging: false,
});
