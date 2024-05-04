/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.fidnAll();
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carService.findOneById(+id);
  }

}
