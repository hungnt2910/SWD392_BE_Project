import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { OrderDetail, Orders, User } from 'src/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  private readonly config = {
    app_id: '2554',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
  };

  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>
  ) {}

  async createPayment(orderId: number) {
    const orderResult = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['customer', 'orderDetails'],
    });

    if (!orderResult) {
      throw new BadRequestException('Order not found');
    }

    if (!orderResult.customer) {
      throw new BadRequestException('Customer information is missing');
    }

    const itemsResult = await this.orderDetailRepository.find({
      where: { order: { orderId } },
      relations: ['product'],
    });

    if (!itemsResult.length) {
      throw new BadRequestException('No items found for this order');
    }

    const items = itemsResult.map(item => ({
      id: item.product.productId,
      name: item.product.productName,
      price: item.price,
      quantity: item.quantity,
      stock: item.product.stock,
    }));

    const transId = orderResult.orderId;
    const appTransId = `${moment().format('YYMMDD')}_${transId}`;
    const embedData = {};

    const order = {
      app_id: this.config.app_id,
      app_trans_id: appTransId,
      app_user: orderResult.customer.id,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embedData),
      amount: orderResult.amount,
      description: `Skincareshop - Payment for the order #${transId}`,
      bank_code: '',
    };

    const data = `${this.config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order['mac'] = CryptoJS.HmacSHA256(data, this.config.key1).toString();

    try {
      const response = await axios.post(this.config.endpoint, null, { params: order });
      return response.data;
    } catch (error) {
      console.error('Payment request failed:', error.response?.data || error.message);
      throw new BadRequestException('Failed to create payment');
    }
  }
}
