import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    // @Transform(({ value }) => parseInt(value, 10))
    @Type( () => Number)
    limit?: number;

    @IsOptional()
    @IsPositive()
    // @Transform(({ value }) => parseInt(value, 10))
    @Type( () => Number)
    offset?: number;

}