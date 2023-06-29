import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import constant from './constant';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: constant.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [UserService, UserResolver, JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, PassportModule, JwtAuthGuard],
})
export class UserModule {}
