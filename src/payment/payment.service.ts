import { BadRequestException, Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as axios from 'axios'

@Injectable()
export class PaymentService {
  private readonly accessKey = 'F8BBA842ECF85'
  private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
  private readonly partnerCode = 'MOMO'
  private readonly redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'
  private readonly ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'
  private readonly requestType = 'payWithMethod'
  private readonly orderInfo = 'pay with MoMo'
  private readonly lang = 'vi'
  private readonly autoCapture = true
  private readonly amount = '50000'

  async createPayment(): Promise<any> {
    const orderId = `${this.partnerCode}${Date.now()}`
    const requestId = orderId
    const extraData = ''

    // Signature generation
    const rawSignature = `accessKey=${this.accessKey}&amount=${this.amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${this.orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${this.requestType}`

    console.log('--------------------RAW SIGNATURE----------------')
    console.log(rawSignature)

    const signature = crypto.createHmac('sha256', this.secretKey).update(rawSignature).digest('hex')

    console.log('--------------------SIGNATURE----------------')
    console.log(signature)

    // JSON object to send to MoMo endpoint
    const requestBody = {
      partnerCode: this.partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount: this.amount,
      orderId,
      orderInfo: this.orderInfo,
      redirectUrl: this.redirectUrl,
      ipnUrl: this.ipnUrl,
      lang: this.lang,
      requestType: this.requestType,
      autoCapture: this.autoCapture,
      extraData,
      signature
    }

    try {
      const response = await axios.default.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
