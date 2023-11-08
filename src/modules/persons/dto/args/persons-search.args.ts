import { Field, 
    InputType} from "@nestjs/graphql";
import { IsOptional,
    IsString } from "class-validator";

@InputType()
export class SearchPersonsArgs {

@Field( () => String, { nullable: true })
@IsOptional()
@IsString()
names?: string;

@Field( () => String, { nullable: true })
@IsOptional()
@IsString()
surNames?: string;

@Field( () => String, { nullable: true })
@IsOptional()
@IsString()
email?: string;

@Field( () => String, { nullable: true })
@IsOptional()
@IsString()
status?: string;

@Field( () => String, { nullable: true })
@IsOptional()
@IsString()
generalCriterial?: string;

}