import { Controller, Get, Param, Put } from '@nestjs/common';
import { SkincareProductService } from './skincare-product.service';

@Controller('skincare-product')
export class SkincareProductController {
    constructor(private readonly SkincareProductService: SkincareProductService){}

    @Get()
    async getAllProduct(){
        return this.SkincareProductService.getAllProduct()
    }

    @Get(':productId')
    async getProductById(@Param() productId: number){
        return this.SkincareProductService.getProductById(productId)
    }

    @Put(':productId')
    async removeProduct(@Param() productId: number){
        return this.SkincareProductService.removeProduct(productId)
    }
}
