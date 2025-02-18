import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, Category, SkincareProduct } from 'src/typeorm/entities';
import { SkincareProductController } from './skincare-product.controller';
import { SkincareProductService } from './skincare-product.service';



@Module({
  imports: [TypeOrmModule.forFeature([SkincareProduct, Brand, Category])],
  controllers: [SkincareProductController],
  providers: [SkincareProductService]  
})
export class SkincareProductModule {}
