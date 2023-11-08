import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { SearchPersonsArgs } from './dto/args/persons-search.args';

@Resolver(() => Person)
export class PersonsResolver {


  constructor(
    private readonly personsService: PersonsService
  ) {}

  @Mutation(() => Person)
  async createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput
  ): Promise<Person | Error> {

    return this.personsService.create(createPersonInput);

  }

  @Query(() => [Person], { name: 'persons' })
  async findAll(): Promise<Person[] | Error> {

    return this.personsService.findAll();

  }

  @Query(() => Person, { name: 'person' })
  async findOne(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Person | Error> {

    return this.personsService.findOne(id);
    
  }

  @Query(() => Person, { name: 'person' })
  async findOneActived(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Person | Error> {

    return this.personsService.findOneActived(id);

  }

  @Query(() => [Person], { name: 'personsSearch' })
  async findByMultiValue(
    @Args('searchPersonsArgs') searchPersonsArgs: SearchPersonsArgs
  ): Promise<Person[] | Error> {

    return this.personsService.findByMultiValue(searchPersonsArgs);

  }

  @Mutation(() => Person)
  async updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput
  ): Promise<Person | Error> {

    return this.personsService.update(updatePersonInput.id, updatePersonInput);

  }

  @Mutation(() => Person)
  async removePerson(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Person | Error> {

    return this.personsService.remove(id);

  }

  @Mutation(() => Person)
  async activedPerson(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Person | Error> {

    return this.personsService.actived(id);

  }

}
