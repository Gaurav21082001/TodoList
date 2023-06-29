import { JwtAuthGuard } from './jwt.auth.guard';
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SigninInputType } from "./type/signin.input.type";
import { SignupInputType } from "./type/signup.input.type";
import { UserType } from "./type/user.type";
import { UserService } from "./user.service";
import { GetUser } from './get.user.decorator';
import { User } from './entity/user.entity';
import { SigninResponseType } from './type/signin.response.type';

@Resolver(() => UserType)
export class UserResolver {
    constructor(private userService: UserService) { }
    @Mutation(() => UserType)
    signup(@Args('input') input: SignupInputType) {
        return this.userService.signup(input);
    }
    @Mutation(() => SigninResponseType)
    signin(@Args('input') input: SigninInputType) {
        return this.userService.signin(input);
    }

    @Query(() => UserType)
    @UseGuards(JwtAuthGuard)
    // profile(@Args('id') id:number)
    profile(@GetUser('user') user: User) {
        return user;
    }
}