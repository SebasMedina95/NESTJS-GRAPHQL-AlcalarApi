import { Resolver,
         Query,
         Mutation,
         Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/inputs/login.input';
import { AuthResponse } from './types/auth-response.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { ValidRoles } from './enums/valid-roles.enum';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( () => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse>{

    return this.authService.login(loginInput)

  }

  @Query( () => AuthResponse, { name: 'revalidateToken' })
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @CurrentUser( [ ValidRoles.ADMIN ] ) user: User
  ): AuthResponse{

    return this.authService.revalidateToken( user );

  }
  
}
