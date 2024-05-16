import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'; 
import * as bcrypt from 'bcrypt';
 
import { CreateUserDto, LoginUserDto } from './dto/index';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

 
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
        private readonly jwtService: JwtService, 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const { password } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      // console.log(user);  
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
    
  }

  async login(loginUserDto: LoginUserDto)  {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id','email', 'password'] // Asegura que se seleccionan el email y la contraseña
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return { 
      ...user, 
      token: this.getJwtToken({ id: user.id })
    };
  }


  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  async checkAuthStatus(user: User){

    return { 
      ...user, 
      token: this.getJwtToken({ id: user.id })
    };
    
  }


}
