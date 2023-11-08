import { InputType,
         Int,
         Field } from '@nestjs/graphql';
import { IsArray,
         IsDate,
         IsNotEmpty,
         IsNumber,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from 'class-validator';
import { Person } from '../../persons/entities/person.entity';

@InputType()
export class CreateUserInput {
  
  @Field( () => Int )
  @IsNumber()
  @IsNotEmpty()
  public person?: Person | number;
  
  @Field( () => String )
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty()
  public username: string;
  
  @Field( () => String )
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  public password: string;
  
  @Field( () => [ String ] )
  @IsArray()
  @IsOptional()
  public roles: string[];
  
  @Field( () => String, { nullable: true } )
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  public status: string;
  
  @Field( () => String, { nullable: true })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  public annotations: string;
  
  @Field( () => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  public dateCreate: Date;
  
  @Field( () => String, { nullable: true })
  @IsString()
  @IsOptional()
  public userCreate: string;
  
  @Field( () => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  public dateUpdate: Date;
  
  @Field( () => String, { nullable: true })
  @IsString()
  @IsOptional()
  public userUpdate: string;
  
}
