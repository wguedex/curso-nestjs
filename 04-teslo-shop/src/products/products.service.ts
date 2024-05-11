import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductService');
  
  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) {}  
  
  async create(createProductDto: CreateProductDto) {

    try {
      console.log(createProductDto)
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save( product );

      return product;
      
    } catch (error) {

      this.handleDBExceptions(error);

    }
  }

  private handleDBExceptions(error: any) {
 
      if (error.code === '23505')
        throw new BadRequestException(error.detail)

      this.logger.error(error);
     throw new  InternalServerErrorException('Unexpected error, check server logs')
    
  }
 
  findAll(paginationDto:PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })

  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
