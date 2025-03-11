import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand, SkincareProduct } from 'src/typeorm/entities'
import { Like, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class SkincareProductService {
  constructor(
    @InjectRepository(SkincareProduct)
    private readonly SkincareProductRepository: Repository<SkincareProduct>,
  ) {}

  async getAllProduct() {
    return this.SkincareProductRepository.find()
  }

  async getProductById(productId : number) {
    console.log(productId)
    const product = await this.SkincareProductRepository.findOne({
      where: { productId },
      relations: ["category"], 
    })

    console.log(product)
    if(!product){
      throw new NotFoundException("Product is not found")
    }
    const relateProduct = await this.SkincareProductRepository.find({ where: { category: product?.category } })
    return { ...product, relatedProduct: relateProduct }
  }

  async removeProduct(productId) {
    const result: UpdateResult = await this.SkincareProductRepository.update(productId, { isActive: false })

    if (result.affected === 0) {
      throw new NotFoundException('Product not found')
    }

    return await this.SkincareProductRepository.findOne({ where: { productId } })
  }

  async getProductsByBrand(brandName: string) {
    return await this.SkincareProductRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand') // Join with Brand table
      .where('brand.brandName = :brandName', { brandName }) // Filter by brand name
      .getMany();
  }

  async searchProductByName(productName : string){
    console.log(productName)
    return await this.SkincareProductRepository.find({
      where: {
        productName: Like(`%${productName}%`)
      }
    })
  }

}
