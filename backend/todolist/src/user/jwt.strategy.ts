import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import constant from "./constant";
import { User } from "./entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: constant.secret,
    });
  }
  async validate(payload: any) {
    const { id } = payload;
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    return user;
  }
}