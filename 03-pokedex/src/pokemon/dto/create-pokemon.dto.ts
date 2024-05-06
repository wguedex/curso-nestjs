
import { IsString, IsInt, IsPositive, Min, MinLength } from 'class-validator';


export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString({
		message: 'Ingresar un nombre válido'
	})
	@MinLength(1)    
    name: string;

}
