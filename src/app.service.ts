import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg'
import config from 'config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: Array<any>,
    //Conexion a postgress
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ){}

  getHello(): string {
    //console.log(this.tasks);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    console.log(apiKey, ' ', dbName);
    return 'Hello World! ' + apiKey;
  }

  getTasks(){
    return new Promise((resolve,reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {

        if(err){
          reject(err);
        }

        resolve(res.rows);
      });
    });

  }
}
