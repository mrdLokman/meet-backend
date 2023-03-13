import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser, Public } from 'src/decorators';
import { Serialize } from 'src/interceptors';
import { UserDto } from 'src/users/dtos';
import { AuthService } from './auth.service';
import { SignupUserDto, SigninUserDto, Tokens } from './dtos';
import { LocalAuthGuard, GoogleAuthGuard, GoogleTokenAuthGuard, FacebookAuthGuard, FacebookTokenAuthGuard } from './guards';

@ApiTags('Authentication')
@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    
    @Post('signup')
    @ApiCreatedResponse({
        description: 'User Signup',
        type: UserDto,
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    @Serialize(UserDto)
    signupUser(@Body() payload: SignupUserDto) {
        return this.authService.signup(payload);
    }

    
    @Post('signin')
    @ApiCreatedResponse({
        description: 'User Signin',
        type: Tokens,
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    @UseGuards(LocalAuthGuard)
    signinUser(@CurrentUser() user, @Body() payload: SigninUserDto): Promise<Tokens> {
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
    @ApiOkResponse({
        description: 'User Signed in',
        type: Tokens,
    })
    @ApiUnauthorizedResponse({
        description: 'Unvalid access token'
    })
    @UseGuards(FacebookTokenAuthGuard)
    async facebookTokenLogin(@CurrentUser() user, @Query('access_token') access_token: string): Promise<Tokens>  {
        return this.authService.login(user);
    }

    @Get('google')
    @ApiOkResponse({
        description: 'User Signed in',
        type: Tokens,
    })
    @ApiUnauthorizedResponse({
        description: 'Unvalid access token'
    })
    @UseGuards(GoogleTokenAuthGuard)
    async googleTokenLogin(@CurrentUser() user, @Query('access_token') access_token: string): Promise<Tokens>  {
        return this.authService.login(user);
    }
}
