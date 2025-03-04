import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderDetail, Orders, SkincareProduct, User } from 'src/typeorm/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetail, SkincareProduct, User])],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule {}
