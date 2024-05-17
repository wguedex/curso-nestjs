import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";


export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'How many rows do you need'
      })
    @IsOptional()
    @IsPositive()
    // @Transform(({ value }) => parseInt(value, 10))
    @Type( () => Number)
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'How many rows do you want to skip'
      })  
    @IsOptional()
    @IsPositive()
    // @Transform(({ value }) => parseInt(value, 10))
    @Type( () => Number)
    offset?: number;

}