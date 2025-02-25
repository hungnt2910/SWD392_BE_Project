import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { SkincareProductService } from './skincare-product.service';

@Controller('skincare-product')
export class SkincareProductController {
    constructor(private readonly SkincareProductService: SkincareProductService){}

    @Get()
    async getAllProduct(){
        return this.SkincareProductService.getAllProduct()
    }

    @Get(':productId')
    async getProductById(@Param('productId') productId: number){
        console.log(productId)
        return this.SkincareProductService.getProductById(productId)
    }

    @Put(':productId')
    async removeProduct(@Param('productId') productId: number){
        return this.SkincareProductService.removeProduct(productId)
    }

    @Get('brand/:brandName')
    getProductByBrandName(@Param('brandName') brandName: string){
        return this.SkincareProductService.getProductsByBrand(brandName)
    }

    @Get("search/byname")
    searchProductByName(@Query() query : any){
        console.log(query)
         return this.SkincareProductService.searchProductByName(query.productname)
    }
}
