import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderDetail, Orders, SkincareProduct, SkincareProductDetails, User } from 'src/typeorm/entities'
import { Repository } from 'typeorm'
import { OrderItemDto, ReadyToCheckoutDto } from './dto/order-items-dto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>
  ) {}

  async getAllOrderByUser(userId: number) {
    return await this.orderRepository.find({ where: { customer: { id: userId } }, relations: ['orderDetails'] })
  }
}
