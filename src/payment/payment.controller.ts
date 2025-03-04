import { Body, Controller, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create')
  createPayment(@Body() orderId: number) {
    console.log(orderId)

    return this.paymentService.createPayment(orderId)
  }
}
