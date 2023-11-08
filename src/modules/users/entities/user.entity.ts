import { ObjectType,
         Field,
         ID } from '@nestjs/graphql';
import { Column,
         Entity,
         JoinColumn,
         OneToOne,
         PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../persons/entities/person.entity';
import { Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'T_USUARIOS' })
export class User {
  
  @Field( () => Int)
  @PrimaryGeneratedColumn({
    name: "C_ID",
    comment: "PK numérica autogenerada para tabla usuarios"
  })
  public id: number;

  @Field( () => Person)
  @OneToOne( () => Person, (person) => person.user, { eager: true })
  @JoinColumn({ name: 'C_PERSON_FK', foreignKeyConstraintName: "FK_T_PERSONAS" })
  public person?: Person | number;

  @Field( () => String)
  @Column({
    name: "C_USUARIO",
    type: 'varchar',
    length: 50,
    unique: true,
    comment: 'Username del usuario'
  })
  public username: string;

  @Field( () => String)
  @Column({
    name: "C_PASSWORD",
    type: 'varchar',
    length: 100,
    comment: 'Contraseña del usuario'
  })
  public password: string;

  @Field( () => [ String ])
  @Column({
    name: "C_ROLES",
    type: "text",
    array: true,
    default: ['USER'],
    comment: 'Roles del Usuario'
  })
  public roles: string[];

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
    name: "C_ANOTACIONES",
    type: 'varchar',
    length: 1000,
    nullable: true,
    comment: 'Anotaciones adicionales del usuario'
  })
  public annotations: string;

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
  
}
