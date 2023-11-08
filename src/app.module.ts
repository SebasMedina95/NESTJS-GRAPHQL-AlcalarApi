import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, 
         ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { PersonsModule } from './modules/persons/persons.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

import { join } from 'path';
import { dataSourceOptions } from './config/db/data-source';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [

    //? Configuración Global
    ConfigModule.forRoot({ isGlobal: true }),

    //? Configuración del TypeORM y MySQL
    TypeOrmModule.forRoot(dataSourceOptions),

    //? Configuración GraphQL
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   plugins: [
    //     ApolloServerPluginLandingPageLocalDefault()
    //   ]
    // }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      useFactory: async( jwtService: JwtService ) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [
          ApolloServerPluginLandingPageLocalDefault()
        ],
        context({ req }) {
          
          //TODO: Lo dejamos desactivado para que no choque con la validación login
          //TODO: Tendríamos que tercerizar la parte de login para no tener este detalle.
          // const token = req.headers.authorization?.replace('Bearer ','');
          // if( !token ) throw Error("El Token es requerido");

          // const payload = jwtService.decode( token );
          // if( !payload ) throw Error("El Token no es válido");
          
        }
      })
    }),
    

    PersonsModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    RestaurantModule,

  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule { }
