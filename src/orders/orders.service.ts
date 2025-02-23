import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Orders } from 'src/typeorm/entities'
import { Repository } from 'typeorm'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>
  ) {}

  async getAllOrderByUser(userId : number){
    return await this.orderRepository.find({where: {customer: {id: userId}},
        relations: ['orderDetails'],  
    })
  }
}
