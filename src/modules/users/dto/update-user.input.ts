import { CreateUserInput } from './create-user.input';
import { ValidRoles } from '../../auth/enums/valid-roles.enum';
import { InputType,
         Field,
         PartialType,
         Int,
         ID } from '@nestjs/graphql';
import { IsArray, IsDate, IsNotEmpty, 
         IsNumber, 
         IsOptional, 
         IsString} from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field(() => [ValidRoles], { nullable : true })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[]

  @Field(() => String, { nullable : true })
  @IsString()
  @IsOptional()
  status?: string

  @Field(() => String, { nullable : true })
  @IsString()
  @IsOptional()
  annotations?: string

}
