import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
// import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
 
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req()
    // request: Express.Request

    @GetUser() user: User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders: string[], 
    // @Headers() headers: IncomingHttpHeaders
  ){

    // console.log(request)
    // console.log({user: request.user})
    return {
      ok:true, 
      message: 'Hola mundo private', 
      user, 
      email: userEmail, 
      rawHeaders, 
      // Headers
    }
  }
 
    // @SetMetadata('roles',['admin','super-user'])
  @Get('private2')
  @RoleProtected(ValidRoles.superUser)

  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
  @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    };
  }
   
  // @RoleProtected(ValidRoles.superUser) 
  // @UseGuards(AuthGuard(), UserRoleGuard)  
  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
  @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }
  

}
