import { User } from '../../users/entities/user.entity';
import { ObjectType,
         Field,
         ID } from '@nestjs/graphql';
import { Column,
         Entity,
         OneToOne,
         PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'T_PERSONAS' })
export class Person {

  @Field( () => ID)
  @PrimaryGeneratedColumn({
    name: "C_ID",
    comment: "PK numérica autogenerada para tabla personas"
  })
  public id: number;
  
  @Field( () => String)
  @Column({
    name: "C_NUMERO_DOCUMENTO",
    type: 'varchar',
    length: 50,
    unique: true,
    comment: 'Número de documento de identidad'
  })
  public document: string;

  @Field( () => String)
  @Column({
    name: "C_TIPO_DOCUMENTO",
    type: 'varchar',
    length: 50,
    comment: 'Tipo de documento de identidad'
  })
  public documentType: string;

  @Field( () => String)
  @Column({
    name: "C_NOMBRES",
    type: 'varchar',
    length: 150,
    comment: 'Nombres de la persona'
  })
  public names: string;

  @Field( () => String)
  @Column({
    name: "C_APELLIDOS",
    type: 'varchar',
    length: 150,
    comment: 'Apellidos de la persona'
  })
  public surNames: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_TELEFONO_FIJO",
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'Teléfono Fíjo de la persona'
  })
  public landline: string;

  @Field( () => String)
  @Column({
    name: "C_TELEFONO_MOVIL",
    type: 'varchar',
    length: 30,
    comment: 'Teléfono Móvil de la persona'
  })
  public mobilePhone: string;

  @Field( () => String)
  @Column({
    name: "C_EMAIL",
    type: 'varchar',
    length: 150,
    unique: true,
    comment: 'Correo Electrónico de la persona'
  })
  public email: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_DIRECCION_RESIDENCIA",
    type: 'varchar',
    length: 150,
    nullable: true,
    comment: 'Dirección Residencial de la persona'
  })
  public address: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_NACIMIENTO",
    type: 'date',
    nullable: true,
    comment: 'Nacimiento de la persona'
  })
  public birthdate: Date;

  @Field( () => String)
  @Column({
    name: "C_GENERO",
    type: 'varchar',
    length: 1,
    default: "M",
    comment: 'Género de la persona'
  })
  public gender: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_ANOTACIONES",
    type: 'varchar',
    length: 1000,
    nullable: true,
    comment: 'Anotaciones adicionales de la persona'
  })
  public annotations: string;

  @Field( () => String)
  @Column({
    name: "C_ESTADO",
    type: 'varchar',
    length: 1,
    default: 'A',
    comment: 'Estado columna de base de datos'
  })
  public status: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_FECHA_CREACION",
    type: 'date',
    nullable: true,
    comment: 'Fecha Creación de la row'
  })
  public dateCreate: Date;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_USUARIO_CREO",
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'Documento Usuario que creo la row'
  })
  public userCreate: string;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_FECHA_ACTUALIZACION",
    type: 'date',
    nullable: true,
    comment: 'Fecha Actualización de la row'
  })
  public dateUpdate: Date;

  @Field( () => String, { nullable: true })
  @Column({
    name: "C_USUARIO_ACTUALIZO",
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'Documento Usuario que actualizó la row'
  })
  public userUpdate: string;

  @OneToOne( () => User, (user) => user.person )
  user: User[]

}
