import { Module } from '@nestjs/common'
import { VoucherController } from './voucher.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserVoucher, Voucher } from 'src/typeorm/entities'
import { VoucherService } from './voucher.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserVoucher, Voucher, User])],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService]
})
export class VoucherModule {}
