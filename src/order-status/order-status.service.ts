import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {
  constructor(@InjectRepository(OrderStatus) private readonly orderStatusRepository: Repository<OrderStatus>) {}



  async createSeed(createOrderStatusDto: CreateOrderStatusDto[]) {
    for(const orderStatus of createOrderStatusDto) {
    const found = await this.findOne(orderStatus.name);
    
    if (!found) {
      const newStatus = this.orderStatusRepository.create(orderStatus)
      await this.orderStatusRepository.save(newStatus)
    } else {
      return false
    }
  }
    return this.findAll()
  }


  async findAll() {
    return await this.orderStatusRepository.find()
  }

  async findOne(name: string) {
    return await this.orderStatusRepository.findOneBy({name})
  }

  delete(id: string) {
    this.orderStatusRepository.delete(id)
  }
}
