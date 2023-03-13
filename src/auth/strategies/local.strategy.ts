import { UnauthorizedException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(username:string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException('Unauthorized user!');
        }
        return user;
    }
}