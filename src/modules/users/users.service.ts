import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MyErrorsExceptions } from '../../helpers/errors-condensed';
import { UserCreateResponse } from './dto/types/user-create-response.type';
import { Person } from '../persons/entities/person.entity';
import { PersonsService } from '../persons/persons.service';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UsersService');
  private readonly errors = new MyErrorsExceptions();

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly personService: PersonsService
  ){}

  async create(createUserInput: CreateUserInput, user: User): Promise<UserCreateResponse | Error> {

    try {

      const getUser = this.usersRepository.findOne({
        where: { id : user.id },
        relations: {
          person : true
        }
      })

      const getUserSerial = (await getUser).person as Person;

      const newUser = this.usersRepository.create({
        ...createUserInput,
        password: bcrypt.hashSync( createUserInput.password, 10 ),
        userCreate: getUserSerial.document,
        dateCreate: new Date()
      });

      const saveUser = await this.usersRepository.save( newUser );
      const getPerson = await this.personService.findOne(Number(createUserInput.person));

      const objResult: UserCreateResponse = {
        person : getPerson,
        user: saveUser
      }

      return objResult

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);
      
    }

  }

  async findAll( roles: ValidRoles[] ): Promise<User[] | Error> {

    try {

      // if( roles.length === 0 ){

        return await this.usersRepository.find({
          relations: {
            person : true
          },
          order: { username: "ASC" }
        });

      // }

      // const user = await this.usersRepository.find({
      //   relations: {
      //     person : true
      //   },
      //   order: { username: "ASC" }
      // });


      // const validRoles: ValidRoles[] = roles;
      // for (const i of user) {
      //   const getArrayUser: string[] = i.roles;

      //   console.log(getArrayUser);
      //   console.log(validRoles);

      //   // if( getArrayUser.includes(validRoles) ){
      //   //   // console.log(getArrayUser);
      //   //   console.log("Hola")
      //   // }
      // }

      //? Tenemos Roles
      // return await this.usersRepository
      //   .createQueryBuilder()
      //   .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      //   .setParameter('roles', roles)
      //   .getMany()

      

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }

  }

  async findOneById(id: number): Promise<User | Error> {
    
    try {

      const search = await this.usersRepository.findOne({ 
        where: { id: id },
        relations: {
          person : true
        }
      });

      if (!search)
        return new Error(`No se encontró un usuario con el ID: ${id}`);

      return search;

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }
    
  }

  async findOneByUserName(username: string): Promise<User | Error> {
    
    try {

      const search = await this.usersRepository.findOne({ 
        where: { username: username },
        relations: {
          person : true
        }
      });

      if (!search)
        return new Error(`No se encontró un usuario con el Username: ${username}`);

      return search;

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);

    }
    
  }

  async update(id: number, updateUserInput: UpdateUserInput, user: User): Promise<UserCreateResponse | Error> {

    try {
      
      //**Obtengamos el usuario logeado */
      const getUserLogin = await this.usersRepository.findOne({
        where: { id : user.id },
        relations: {
          person : true
        }
      })
      
      //**Obtengamos el usuario que queremos actualizar */
      const getUser = await this.usersRepository.findOne({
        where: { id : id },
        relations: {
          person : true
        }
      })

      if (!getUser)
        return new Error(`No se encontró un usuario con el ID: ${id}`);

      //**Serializamos para las respuestas */
      const getUserSerial = getUser.person as Person;
      const getUserLoginSerial = getUserLogin.person as Person;

      const objUserUpd = {
        id,
        roles: updateUserInput.roles,
        status: updateUserInput.status,
        annotations: updateUserInput.annotations,
        dateUpdate: new Date(),
        userUpdate: getUserLoginSerial.document
      }

      const prepareUpdateUser = await this.usersRepository.preload(objUserUpd);
      const updateUser = await this.usersRepository.save(prepareUpdateUser);

      return {
        person: getUserSerial,
        user: updateUser
      };

    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);
      
    }

  }

  async blockUser(id: number, user: User): Promise<UserCreateResponse | Error> {

    try {

      //**Obtengamos el usuario logeado */
      const getUserLogin = await this.usersRepository.findOne({
        where: { id : user.id },
        relations: {
          person : true
        }
      })
      
      //**Obtengamos el usuario que queremos actualizar */
      const getUser = await this.usersRepository.findOne({
        where: { id : id },
        relations: {
          person : true
        }
      })

      if (!getUser)
        return new Error(`No se encontró un usuario con el ID: ${id}`);

      //**Serializamos para las respuestas */
      const getUserSerial = getUser.person as Person;
      const getUserLoginSerial = getUserLogin.person as Person;

      getUser.status = "I";
      getUser.userUpdate = getUserLoginSerial.document;
      getUser.dateUpdate = new Date();

      const saveUser = await this.usersRepository.save(getUser);

      return {
        person: getUserSerial,
        user: saveUser
      };
      
    } catch (error) {

      this.logger.error(error);
      return this.errors.handleDbExceptions(error);
      
    }

  }
}
