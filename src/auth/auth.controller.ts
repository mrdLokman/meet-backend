import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { Serialize } from 'src/interceptors';
import { UserDto } from 'src/users/dtos';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dtos';
import { LocalAuthGuard, GoogleAuthGuard, GoogleTokenAuthGuard, FacebookAuthGuard, FacebookTokenAuthGuard } from './guards';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    
    @Post('signup')
    @Serialize(UserDto)
    signupUser(@Body() payload: SignupUserDto) {
        return this.authService.signup(payload);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signinUser(@CurrentUser() user): Promise<Tokens> {
        return this.authService.login(user);
    }

    @Get('v2/facebook')
    @UseGuards(FacebookAuthGuard)
    async facebookLogin() {
        return HttpStatus.OK;
    }

    @Get('v2/facebook/callback')
    @UseGuards(FacebookAuthGuard)
    async facebookLoginCallback(@CurrentUser() user): Promise<Tokens> {
        return this.authService.login(user);
    }

    @Get('v2/google')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {
        return HttpStatus.OK;
    }

    @Get('v2/google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@CurrentUser() user): Promise<Tokens>  {
        return this.authService.login(user);
    }

    @Get('facebook')
    @UseGuards(FacebookTokenAuthGuard)
    async facebookTokenLogin(@CurrentUser() user): Promise<Tokens>  {
        return this.authService.login(user);
    }

    @Get('google')
    @UseGuards(GoogleTokenAuthGuard)
    async googleTokenLogin(@CurrentUser() user): Promise<Tokens>  {
        return this.authService.login(user);
    }
}
