import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg'
import config from '../../config';


const API_KEY = 'dev-123123123';
const API_KEY_PROD = "prod-12343433232";



@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    {
      provide: 'PG',
      useFactory:(configService: ConfigType<typeof config>) => {
        const {
          userPostgres,
          hostPostgres,
          dbPostgres,
          passwordPostgres,
          portPostgres
        } = configService.postgres;

        //Configuracion de la base de datos
        const client = new Client({
          user: userPostgres,
          host: hostPostgres,
          database: dbPostgres,
          password: passwordPostgres,
          port: portPostgres
        });

        //Conectamos a la bdd
        client.connect();

        return client;
      },
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'PG']
})
export class DatabaseModule {}
