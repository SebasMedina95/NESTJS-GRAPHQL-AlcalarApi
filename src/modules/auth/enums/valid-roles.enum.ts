import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {

    ADMIN = 'ADMIN', 
    USER = 'USER', 
    SUPER_USER = 'SUPER_USER',
    DEV = 'DEV'
}

registerEnumType( ValidRoles, { name: 'ValidRoles', description: 'Minim dolore adipisicing sit nisi amet ut minim ullamco reprehenderit proident.' })