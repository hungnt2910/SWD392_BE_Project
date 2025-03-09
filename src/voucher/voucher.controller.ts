import { Controller, UseGuards, Post, Body, Put, Param } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { VoucherService } from './voucher.service'
import { createVoucherDto, updateVoucherDto } from './dto/voucher-dto'

@UseGuards(AuthGuard)
@Controller('voucher')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Post('create')
  createVoucher(@Body() createVoucherDto: createVoucherDto) {
    return this.voucherService.createVoucher(createVoucherDto)
  }

  @Put('update/:voucherId')
  updateVoucher(@Param('voucherId') voucherId: number, @Body() updateVoucherDto: updateVoucherDto) {
    return this.voucherService.updateVoucher(voucherId, updateVoucherDto)
  }
}
