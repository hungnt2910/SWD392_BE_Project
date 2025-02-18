import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SkincareProduct } from 'src/typeorm/entities'
import { Repository, UpdateResult } from 'typeorm'

@Injectable()
export class SkincareProductService {
  constructor(
    @InjectRepository(SkincareProduct)
    private readonly SkincareProductRepository: Repository<SkincareProduct>
  ) {}

  async getAllProduct() {
    return this.SkincareProductRepository.find()
  }

  async getProductById(productId) {
    return this.SkincareProductRepository.findOne({ where: { productId: productId } })
  }

  async removeProduct(productId) {
    const result: UpdateResult = await this.SkincareProductRepository.update(productId, { isActive: false })

    if (result.affected === 0) {
      throw new NotFoundException('Product not found')
    }

    return await this.SkincareProductRepository.findOne({ where: { productId } })
  }
}
