/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.fidnAll();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    // console.log({id});
    return this.carService.findOneById(id);
  }

  @Post()
  createCar( @Body() createCarDTO : CreateCarDTO){
    return createCarDTO;
  }

  @Patch(':id')
  updateCar( 
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() body : any){
    return body;
  }
  
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string){
    return {
        method:'delete',
        id
    };
  }

}
