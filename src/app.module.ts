import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { Client } from 'pg'

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from 'enviroments';
import config from 'config';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: 'admin123',
  port: 5432
});

client.connect();

client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
});

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV ] || '.env',
      load: [ config ],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required()
      })
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async(http: HttpService) => {
        const response = await firstValueFrom(http.get('https://jsonplaceholder.typicode.com/todos'));

        return response.data;
      },
      inject: [ HttpService ]
    }
  ],
})
export class AppModule {}
