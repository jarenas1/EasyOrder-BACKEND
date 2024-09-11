import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User> ) {}

  async create(createUserDto: CreateUserDto) {

    try {
      const existing= await this.findByUsername(createUserDto.username)

      if (existing) {
        throw new Error('Username already exists')
      }

      let password = await bcrypt.hash(createUserDto.password, 10)
      createUserDto = { ...createUserDto, password}
      const newUser = this.userRepository.create(createUserDto)
      return await this.userRepository.save( newUser)

    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  findAll() {
    return this.userRepository.find({relations: {
      tables: true,
      role: true
    }})
  }

  async findByUsername(username:string) {
    try {
      return await this.userRepository.findOne({where: {username}, relations: {role: true}})
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findOne(id: string) {
    const found = await this.userRepository.findOneBy({id})

    if (!found) {
      throw new NotFoundException("User not found aqui")
    }

    return found
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let found = await this.findOne(id)
    if(!found) {
      throw new HttpException("User not found",HttpStatus.NOT_FOUND)
    }

    const updatedItem = await this.userRepository.save({
      ...found,
      ...updateUserDto
    })

    return updatedItem
  }

  async remove(id: string) {
    await this.userRepository.delete(id)
    return {message: "Deleted Successful"}
  }
}
