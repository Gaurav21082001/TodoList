import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SigninInputType{
    
    @Field()
    email:string;

    @Field()
    password:string;
}