import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { find } from 'rxjs';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}


  async createManySeed(createRoleDto: CreateRoleDto[]) {
    for(const role of createRoleDto) {
      const found = await this.findOneSeed(role.type)
      console.log(found);
      if (!found) {
        const newRole = this.roleRepository.create(role)
        await this.roleRepository.save(newRole)
      } else {
        return false
      }
    }
    return this.findAll()
  }

  async findOneSeed(type: string) {
    return await this.roleRepository.findOneBy({type});
  }

  async findAll() {
    return await this.roleRepository.find({relations: {users:true}})
  }

  delete(id: string) {
    this.roleRepository.delete(id)
  }
}
