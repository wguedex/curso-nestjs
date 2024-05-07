import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import * as bcryptjs from 'bcryptjs';

import { v4 as uuid } from 'uuid';
import { isEmpty } from 'class-validator';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = new this.pokemonModel({
        no: createPokemonDto.no,
        name: createPokemonDto.name.toLocaleLowerCase(),
      });

      await newPokemon.save();

      return newPokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create Pokemon - Check server logs`,
      );
    }

    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string): Promise<Pokemon> {
    // try {
    //   const results = await this.pokemonModel.findOne({ no: id }).exec();

    //   if (isEmpty(results)) throw new Error('Pokemon isnt exists');

    //   return results;
    // } catch (error) {
    //   console.log('Error ===', error);
    // }

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
        pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //MongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }
 
    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }
  
    if (!pokemon) {
      throw new NotFoundException("Pokemon with id, name or no \"" + term + "\" not found");
  }
  return pokemon;
  
 
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
