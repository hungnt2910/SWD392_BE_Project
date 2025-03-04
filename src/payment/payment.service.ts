import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as qs from 'querystring'
import * as CryptoJS from 'crypto-js'
import { In, Repository } from 'typeorm'
import { OrderDetail, Orders, SkincareProduct, User } from 'src/typeorm/entities'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>
  ) {}

  async createPayment(orderId: number) {
    const config = {
      app_id: '2553',
      key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
      key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
    }
    console.log(orderId)

    const embed_data = {
      redirecturl: 'https://www.youtube.com/'
    }

    const orderResult = await this.orderRepository.findOne({
      where: { orderId: 11 },
      relations: ['customer', 'orderDetails']
    })
    console.log(orderResult)

    if (!orderResult) {
      throw new BadRequestException('Order not found')
    }

    if (!orderResult.customer || !orderResult.customer.id) {
      throw new BadRequestException('Customer information is missing')
    }

    const itemsResult = await this.orderDetailRepository.find({
      where: { order: { orderId: orderId } },
      relations: ['product']
    })
    console.log(itemsResult)

    if (itemsResult.length === 0) {
      throw new BadRequestException('No items found for this order')
    }

    const items = itemsResult.map((item) => ({
      id: item.product.productId,
      name: item.product.productName,
      price: item.price,
      quantity: item.quantity,
      stock: item.product.stock
    }))

    const transId = orderResult.orderId
    const formatDate = () => {
      const now = new Date()
      const year = now.getFullYear().toString().slice(-2)
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}${month}${day}`
    }
    const app_trans_id = `order_${transId}_${formatDate()}`

    const order = {
      app_id: config.app_id,
      app_trans_id: app_trans_id,
      app_user: orderResult.customer.id,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: orderResult.amount,
      description: `Skincareshop - Payment for the order #${transId}`,
      bank_code: ''
    }

    try {
      const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`
      order['mac'] = CryptoJS.HmacSHA256(data, config.key1).toString()

      const response = await axios.post(config.endpoint, qs.stringify(order), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      return response.data
    } catch (error) {
      console.error('Payment request failed:', error.response?.data || error.message)
      throw new BadRequestException('Failed to create payment')
    }
  }
}
