import { Injectable, Logger } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { MyErrorsExceptions } from '../../helpers/errors-condensed';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchPersonsArgs } from './dto/args/persons-search.args';

@Injectable()
export class PersonsService {

  private readonly errors = new MyErrorsExceptions();
  private readonly logger = new Logger('PersonsService');

  constructor(
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
  ) { }

  async create(createPersonInput: CreatePersonInput): Promise<Person | Error> {

    try {

      const newPerson = this.personsRepository.create(createPersonInput);
      const savePerson = await this.personsRepository.save(newPerson);
      return savePerson;

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }

  }

  async findAll(): Promise<Person[] | Error> {

    try {
      
      const getPersons = this.personsRepository.createQueryBuilder("person");
      getPersons.orderBy("person.id", "DESC");
      const { entities } = await getPersons.getRawAndEntities();
      
      return entities;

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);
      
    }

  }

  async findOne(id: number): Promise<Person | Error> {

    try {
      
      const getPerson = await this.personsRepository.findOne({
        where: { id : id }
      })

      return getPerson;
      
    } catch (error) {
      
      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }

  }

  async findOneActived(id: number): Promise<Person | Error> {

    try {

      const search = await this.personsRepository.findOne({
        where: {
          id: id,
          status: "A"
        }
      });

      return search;

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }

  }

  async findByMultiValue(searchPersonsArgs: SearchPersonsArgs): Promise<Person[] | Error> {

    try {

      let query = null;

      //* ************************************************
      //* Si fueramos a buscar de a uno según un criterio
      //* ************************************************
      if (searchPersonsArgs.email) {
        query = await this.personsRepository.createQueryBuilder('person')
          .where(`LOWER(person.email) LIKE :search`, { search: `%${searchPersonsArgs.email}%` })
          .getMany();
      }

      if (searchPersonsArgs.names) {
        query = await this.personsRepository.createQueryBuilder('person')
          .where(`LOWER(person.names) LIKE :search`, { search: `%${searchPersonsArgs.names}%` })
          .getMany();
      }

      if (searchPersonsArgs.surNames) {
        query = await this.personsRepository.createQueryBuilder('person')
          .where(`LOWER(person.surNames) LIKE :search`, { search: `%${searchPersonsArgs.surNames}%` })
          .getMany();
      }

      if (searchPersonsArgs.status) {
        console.log("Aquí estoy !", searchPersonsArgs.status)
        query = await this.personsRepository.createQueryBuilder('person')
          .where(`LOWER(person.status) = :search`, { search: searchPersonsArgs.status })
          .getMany();
      }

      //* ************************************************
      //* Para un buscador dinámico por varios parámetros
      //* ************************************************
      if (searchPersonsArgs.generalCriterial) {
        query = await this.personsRepository.createQueryBuilder('person')
          .where(`LOWER(person.email) LIKE :search`, { search: `%${searchPersonsArgs.generalCriterial}%` })
          .orWhere(`LOWER(person.names) LIKE :search`, { search: `%${searchPersonsArgs.generalCriterial}%` })
          .orWhere(`LOWER(person.surNames) LIKE :search`, { search: `%${searchPersonsArgs.generalCriterial}%` })
          .andHaving(`LOWER(person.status) = :param`, { param: `A` })
          .getMany()
      }

      return query;

    } catch (error) {

      this.logger.error(error);
      return new Error(`ATENCIÓN, se presentó un error al consultar los datos, revise. ${error}`);

    }

  }

  async update(id: number, updatePersonInput: UpdatePersonInput): Promise<Person | Error> {

    try {

      const search = await this.findOneActived(id);

      if (!search)
        return new Error(`No se encontró una persona con el ID: ${id} y/o no está activo en el sistema`);

      const updatePerson = await this.personsRepository.preload(updatePersonInput);
      const saveData = await this.personsRepository.save(updatePerson);
      return saveData;

    } catch (error) {

      this.logger.error(error);
      return new Error(`ATENCIÓN, se presentó un error al actualizar los datos, revise. ${error}`);

    }

  }

  async remove(id: number): Promise<Person | Error> {

    try {

      const search = this.findOne(id);

      if (!search)
        return new Error(`No se encontró una persona con el ID: ${id}.`);

      const updateStatus = await this.personsRepository.preload({
        id: id,
        status: "I"
      });

      return this.personsRepository.save(updateStatus);

    } catch (error) {

      this.logger.error(error);
      return new Error(`ATENCIÓN, se presentó un error al actualizar los datos, revise. ${error}`);

    }

  }

  async actived(id: number): Promise<Person | Error> {

    try {

      const search = this.findOne(id);

      if (!search)
        return new Error(`No se encontró una persona con el ID: ${id}.`);

      const updateStatus = await this.personsRepository.preload({
        id: id,
        status: "A"
      });
      
      return this.personsRepository.save(updateStatus);

    } catch (error) {

      this.logger.error(error);
      return new Error(`ATENCIÓN, se presentó un error al actualizar los datos, revise. ${error}`);

    }

  }
  
}
