import { Injectable } from '@nestjs/common'; 
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly productSercice : ProductsService
  ){

  }

  async runSeed() { 

    await this.insertNewProducts();

    // await this.inser
    return 'Seed executed'
  }

  private async insertNewProducts(){

    await this.productSercice.deleteAllProducts();

    const products = initialData.products;
    const insertPromises = [];

    // products.forEach(product => {
    //   insertPromises.push(this.productSercice.create(product, user));
    // });

    const results = await Promise.all(insertPromises);

    return true;
  }

   
}
