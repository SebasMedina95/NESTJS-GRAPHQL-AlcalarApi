import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthResponse } from './types/auth-response.types';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginInput } from './dto/inputs/login.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken( userId: number ) {
      return this.jwtService.sign({ id: userId });
  }
  
  async validateUser( id: number ): Promise<User> {

    const user = await this.usersService.findOneById( id );
    const getUser = user as User;

    if( getUser.status == "I" )
        throw new UnauthorizedException(`El usuario se encuentra inactivo, hable con el ADMIN.`);

    delete getUser.password;
    return getUser;

  }

  async login( loginInput: LoginInput ): Promise<AuthResponse>{
        
    const { username, password } = loginInput;
    const user = await this.usersRepository.findOne({
      where: { username : username },
      relations: {
        person : true
      }
    })

    if( user.status === "I" )
      throw new BadRequestException('El usuario se encuentra dado de baja, por favor hable con el ADMIN');
    
    if( !bcrypt.compareSync( password, user.password) )
        throw new BadRequestException('Email / Password no coinciden');
    
    const token = this.getJwtToken( user.id );
    
    return {
        token,
        user
    }

  }

  revalidateToken( user: User ): AuthResponse {

    const token = this.getJwtToken( user.id );
    return { token, user }

  }
  
}
