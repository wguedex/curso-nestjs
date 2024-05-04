/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common'; 

@Controller('cars')
export class CarsController {

    @Get()
    getAllCars(): string[]{
        return ['Toyota', 'Honda', 'Jeep'];
    }

}
