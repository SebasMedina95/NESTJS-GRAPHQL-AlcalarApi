import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Module({
  providers: [
    PersonsResolver, 
    PersonsService
  ],
  imports: [
    TypeOrmModule.forFeature([
      Person
    ])
  ],
  exports: [
    PersonsService
  ]
})
export class PersonsModule {}
