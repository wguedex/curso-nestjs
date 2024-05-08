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
import { PaginationDTO } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configSErvice : ConfigService
  ) {
    console.log(process.env.DEFAULT_LIMIT);
    const defaultLimit = configSErvice.get<number>('defaultLimit');  
    console.log(this.defaultLimit)
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = new this.pokemonModel({
        no: createPokemonDto.no,
        name: createPokemonDto.name.toLocaleLowerCase(),
      });

      await newPokemon.save();

      return newPokemon;
    } catch (error) {
      this.handleExceptions(error);
    }

    return 'This action adds a new pokemon';
  }

  findAll(paginationDTO: PaginationDTO) {

    const {limit = 10, offset = 0} = paginationDTO;

    return this.pokemonModel.find()
    .limit( this.defaultLimit )
    .skip( offset ) 
    .sort({
      no : 1
    })
    .select('-__v')
    
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        'Pokemon with id, name or no "' + term + '" not found',
      );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      "Can't create Pokemon - Check server logs",
    );
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }
}
