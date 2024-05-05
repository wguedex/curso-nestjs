/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
// import { BrandsModule } from 'src/brands/brands.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],  
  exports: [CarsService]
})
export class CarsModule {}
