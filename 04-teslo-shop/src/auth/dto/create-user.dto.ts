import { IsEmail, IsString, MinLength, Matches, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    
    @IsEmail({}, { message: "The email address is not valid" })
    @IsString({ message: "The email must be a string" })
    email: string;

    @IsNotEmpty({ message: "The fullname cannot be empty" })
    @IsString({ message: "The fullname must be a string" })
    fullname: string;

    @IsString({ message: "The password must be a string" })
    @MinLength(8, { message: "The password must be at least 8 characters long" })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "The password must include uppercase, lowercase, numbers, and special characters" })
    password: string;
}
