import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database:{
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT
    },
    postgres:{
      userPostgres : process.env.POSTGRES_USER,
      hostPostgres : process.env.POSTGRES_HOST,
      dbPostgres : process.env.POSTGRES_DB,
      passwordPostgres : process.env.POSTGRES_PASSWORD,
      portPostgres : parseInt(process.env.POSTGRES_PORT, 10),
    },
    apiKey: process.env.API_KEY
  }
});
