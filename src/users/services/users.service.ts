import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';


//import { Client } from 'pg';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>){

  }

  async findAll(){
    return this.userRepo.find();
  }

  async findOne(id){
    const user = await this.userRepo.findOneBy({ id });

    if(!user){
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async create(data: CreateUserDto){

    const newUser = await this.userRepo.create(data);

    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto){

    const user = await this.findOne(id);

    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async delete(id: number){
    const user = await this.findOne(id);

    return this.userRepo.delete(id);
  }

  /* async getOrdersByUser(id: number){

    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productService.findAll()
    }
  } */

  //Prueba
  /* getTasks(){
    return new Promise((resolve,reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {

        if(err){
          reject(err);
        }

        resolve(res.rows);
      });
    });

  } */
}
