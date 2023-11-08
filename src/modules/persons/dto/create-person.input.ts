import { InputType,
         Field } from '@nestjs/graphql';
import { IsDate,
         IsEmail,
         IsIn,
         IsNotEmpty,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from 'class-validator';
import { EDocumentTypes } from '../../../global/constants/document-type.enum';

@InputType()
export class CreatePersonInput {
  
  @Field( () => String )
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  public document: string;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  @IsIn([ 
    EDocumentTypes.CC,
    EDocumentTypes.CE,
    EDocumentTypes.LM,
    EDocumentTypes.PS,
    EDocumentTypes.TI,
    EDocumentTypes.OT,
  ])
  public documentType: string;

  @Field( () => String )
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  @IsNotEmpty()
  public names: string;

  @Field( () => String )
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  @IsNotEmpty()
  public surNames: string;

  @Field( () => String, { nullable: true })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  public landline: string;

  @Field( () => String )
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  public mobilePhone: string;

  @Field( () => String )
  @IsString()
  @IsEmail()
  @MaxLength(150)
  public email: string;


  @Field( () => String, { nullable: true })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  public address: string;

  @Field( () => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  public birthdate: Date;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'M',
    'F',
    'O'
  ])
  public gender: string;

  @Field( () => String, { nullable: true })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  public annotations: string;

  @Field( () => String, { nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  public status: string;
  
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
