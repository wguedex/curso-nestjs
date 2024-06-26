import { Module } from '@nestjs/common'; 
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
dotenv.config();

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }), 

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    PokemonModule , 
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      'dbName': 'pokemonsdb'
  }), CommonModule, SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

 
  
  
}
