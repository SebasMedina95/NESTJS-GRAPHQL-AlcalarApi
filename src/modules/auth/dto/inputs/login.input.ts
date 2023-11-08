import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class LoginInput {
    
    @Field( () => String )
    @IsString()
    username: string;

    @Field( () => String )
    @MinLength(6)
    password: string;

}