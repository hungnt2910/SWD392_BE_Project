import { Body, Controller, Param, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create/:orderId')
  createPayment(@Param('orderId') orderId: number) {
    console.log(typeof orderId)

    return this.paymentService.createPayment(orderId)
  }

  // @Post('create')
  // createPayment() {
  //   return this.paymentService.createPayment()
  // }
}
