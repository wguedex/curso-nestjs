// Importa los decoradores de validación
import { IsString, MinLength } from 'class-validator';

// Definición de la clase DTO para la actualización de datos de una marca
export class UpdateBrandDto {
    @IsString()
    @MinLength(1)
    name: string;
}
