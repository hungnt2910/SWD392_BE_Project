import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService : OrdersService){}

    @Get(":userId")
    getUserOrderHistory(@Param('userId') userId: number){
        return this.orderService.getAllOrderByUser(userId)
    }
}
