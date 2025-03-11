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

  @Post('callback')
  handleCallback(@Body() dataStr: string, reqMac: string) {
    console.log(dataStr, reqMac)

    return this.paymentService.handleCallback(dataStr, reqMac)
  }

  @Post('order-status/:orderId')
  orderStatus(@Param('orderId') orderId: number) {
    console.log(orderId)

    return this.paymentService.orderStatus(orderId)
  }

  @Post('sbcreate')
  createSbPayment() {
    return this.paymentService.sbCreatePayment()
  }

  @Post('sbcallback')
  handleSbCallback(@Body() body: any) {
    const { data, mac } = body

    return this.paymentService.validateCallback(data, mac)
  }

  @Post('sbstatus/:appTransId')
  sbOrderStatus(@Param('appTransId') appTransId: string) {
    console.log(appTransId)

    return this.paymentService.queryTransaction(appTransId)
  }

  @Post('refund')
  async refund() {
    return this.paymentService.refundTransaction()
  }

  @Post('query-refund')
  async queryRefund(@Body('m_refund_id') m_refund_id: string) {
    return this.paymentService.queryRefund(m_refund_id)
  }
}
