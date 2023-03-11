import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { Strategy  } from 'passport-google-token'
import { PassportStrategy } from "@nestjs/passport";



@Injectable()
/*
export class GoogleTokenStrategy {}
*/
export class GoogleTokenStrategy extends PassportStrategy(Strategy, 'google-token') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const googleUser = this.authService.validateGoogleUser(profile.id);
    done(null, googleUser);
  }
}
