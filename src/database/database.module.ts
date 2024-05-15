import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { Client } from 'pg'
import config from '../../config';


const API_KEY = 'dev-123123123';
const API_KEY_PROD = "prod-12343433232";



@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory:(configService: ConfigType<typeof config>) => {
        const {
          user,
          host,
          database,
          password,
          port
        } = configService.postgres;

        return {
          type: 'postgres', //mysql
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true, //solo en entorno dev
          autoLoadEntities: true, //sincroniza entidades
        };
      },
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    {
      provide: 'PG',
      useFactory:(configService: ConfigType<typeof config>) => {
        const {
          user,
          host,
          database,
          password,
          port
        } = configService.postgres;

        //Configuracion de la base de datos
        const client = new Client({
          user,
          host,
          database,
          password,
          port
        });

        //Conectamos a la bdd
        client.connect();

        return client;
      },
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule]
})
export class DatabaseModule {}
