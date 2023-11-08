import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserCreateResponse } from './dto/types/user-create-response.type';
import { ValidRolesArgs } from './dto/args/rols.arg';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserCreateResponse, { name : 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser([ValidRoles.ADMIN]) user: User
  ): Promise<UserCreateResponse | Error> {

    return this.usersService.create(createUserInput, user);

  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.ADMIN]) user: User
  ): Promise<User[] | Error> {

    return this.usersService.findAll( validRoles.roles );

  }

  @Query(() => User, { name: 'user' })
  async findOneById(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser([ValidRoles.ADMIN]) user: User
  ): Promise<User | Error> {

    return this.usersService.findOneById(id);

  }

  @Mutation(() => UserCreateResponse)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.ADMIN]) user: User
  ): Promise<UserCreateResponse | Error> {

    return this.usersService.update(updateUserInput.id, updateUserInput, user);

  }

  @Mutation(() => UserCreateResponse, { name : 'blockUser' })
  async blockUser(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser([ValidRoles.ADMIN]) user: User
  ): Promise<UserCreateResponse | Error> {

    return this.usersService.blockUser(id, user);

  }
}
