import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, Category, OrderDetail, SkincareProduct, SkincareProductDetails } from 'src/typeorm/entities';
import { SkincareProductController } from './skincare-product.controller';
import { SkincareProductService } from './skincare-product.service';



@Module({

  imports: [TypeOrmModule.forFeature([SkincareProduct, Brand, Category, SkincareProductDetails, OrderDetail])],

  controllers: [SkincareProductController],
  providers: [SkincareProductService]  
})
export class SkincareProductModule {}
