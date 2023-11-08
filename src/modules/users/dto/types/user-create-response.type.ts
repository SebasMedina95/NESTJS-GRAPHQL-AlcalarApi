import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '../../entities/user.entity';
import { Person } from '../../../persons/entities/person.entity';

@ObjectType()
export class UserCreateResponse {

    @Field( () => Person )
    person?: Person | Error;

    @Field( () => User )    
    user: User;

}