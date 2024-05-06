import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import * as bcryptjs from 'bcryptjs'; 

import { v4 as uuid } from 'uuid';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name ) 
    private readonly pokemonModel: Model<Pokemon>,    
  ){

  }
  
  async create(createPokemonDto: CreatePokemonDto) {

    try {
      const newPokemon = new this.pokemonModel({
        no: createPokemonDto.no,
        name : createPokemonDto.name
      });      
       
       await newPokemon.save(); 

       return newPokemon;
      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    } 
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }    

    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
