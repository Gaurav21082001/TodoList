import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { JwtService } from '@nestjs/jwt'
import { SigninInputType } from "./type/signin.input.type";
import { SignupInputType } from "./type/signup.input.type";

@Injectable()
export class UserService {
    constructor(private jwtService: JwtService) { }

    async signup(input: SignupInputType) {
        const { name, email, password } = input;

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();

        return user;
    }
    async signin(input: SigninInputType) {
        const { email, password } = input;

        const user = await User.findOneBy({ email, password });
        if (!user) {
            throw new UnauthorizedException("User does not exist");
        }
        const paylaod = {
            id: user.id,
            name: user.name
        };
        const token = this.jwtService.sign(paylaod)
        return { token };
    }

    async profile(id: number) {
        const user = await User.findOneBy({ id });
        if (!user) {
            throw new UnauthorizedException('your account does not exist');
        }

        return user;
    }
}