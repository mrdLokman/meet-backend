import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { FacebookTokenStrategy, GoogleTokenStrategy, FacebookStrategy, GoogleStrategy, LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        }
      })
    }),
    PassportModule.register({ defaultStrategy: 'facebook' })
  ],
  providers: [
    AuthService, LocalStrategy, JwtStrategy, FacebookStrategy, GoogleStrategy, GoogleTokenStrategy, FacebookTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
