import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto/index';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  fidnAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  create(createCarDTO: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      brand: createCarDTO.brand,
      model: createCarDTO.model,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDTO: UpdateCarDTO) {

    let carDB = this.findOneById(id);

    if (updateCarDTO.id && updateCarDTO.id !== id) {
      throw new BadRequestException('Car id is not valid inside body');
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        // Suponemos que `updateCarDto` contiene los datos actualizados del carro y que
        // se debe mantener el id original
        carDB = { ...carDB, ...updateCarDTO, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    console.log('aqui')
    this.cars = cars;
}
 
}
