import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import * as FacebookStrategy from 'passport-facebook-token';
import { PassportStrategy } from "@nestjs/passport";


@Injectable()
export class FacebookTokenStrategy extends PassportStrategy(FacebookStrategy, 'facebook-token') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookStrategy.Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    console.log(profile);
    const user = await this.authService.validateFacebookUser(profile.id);
    return done(null, user);
  }
}