import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PersonsService } from '../persons/persons.service';
import { Person } from '../persons/entities/person.entity';

@Module({
  providers: [
    UsersResolver, 
    UsersService,
    PersonsService
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Person
    ])
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
