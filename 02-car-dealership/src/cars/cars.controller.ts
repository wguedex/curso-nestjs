/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(private carService: CarsService){

    }

//   @Get()
//   getAllCars(): string[] {
//     return this.cars;
//   }

//   @Get(':id')
//   getCarById( @Param('id') id:string){
//     return this.cars[id];
//   }
}
