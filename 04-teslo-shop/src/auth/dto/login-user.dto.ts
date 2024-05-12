import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

 
export class LoginUserDto {
    @IsEmail({}, { message: "The email address is not valid" })
    @IsString({ message: "The email must be a string" })
    email: string;
 
    @IsString({ message: "The password must be a string" })
    @MinLength(8, { message: "The password must be at least 8 characters long" })
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "The password must include uppercase, lowercase, numbers, and special characters" })
    password: string;
}