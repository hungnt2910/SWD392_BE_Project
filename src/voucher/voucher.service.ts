import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserVoucher, Voucher } from 'src/typeorm/entities'
import { Repository } from 'typeorm'
import { createVoucherDto, updateVoucherDto } from './dto/voucher-dto'

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(UserVoucher)
    private userVoucherRepository: Repository<UserVoucher>,
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>
  ) {}

  async createVoucher(createVoucherDto: createVoucherDto) {
    const { discount, expirationDate } = createVoucherDto

    // Use raw SQL query with ? placeholders for MySQL
    const existingVoucher = await this.voucherRepository.query(
      `SELECT * FROM voucher 
     WHERE CAST(discount AS DECIMAL(10,2)) = ? 
     AND expirationDate = ?`,
      [discount, expirationDate]
    )

    if (existingVoucher.length > 0) {
      throw new BadRequestException(
        `A voucher with discount ${discount}% and expiration date ${expirationDate} already exists`
      )
    }

    const voucher = new Voucher()
    voucher.code = createVoucherDto.code
    voucher.discount = createVoucherDto.discount
    voucher.expirationDate = createVoucherDto.expirationDate

    return await this.voucherRepository.save(voucher)
  }

  async updateVoucher(voucherId: number, updateVoucherDto: updateVoucherDto) {
    const voucher = await this.voucherRepository.findOne({ where: { voucherId: voucherId } })

    if (!voucher) {
      throw new Error(`Voucher with id ${voucherId} not found`)
    }

    if (updateVoucherDto.discount !== undefined) {
      voucher.discount = updateVoucherDto.discount
    }

    if (updateVoucherDto.expirationDate !== undefined) {
      voucher.expirationDate = updateVoucherDto.expirationDate
    }

    await this.voucherRepository.save(voucher)

    return {
      success: true,
      message: 'Voucher updated successfully'
    }
  }
}
