import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from 'src/users/dtos';
import { SignupUserDto, Tokens } from './dtos';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserSource } from 'src/users/enums';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        
        if(!user){
            throw new NotFoundException('User does not exist');
        }

        const [salt, storedhash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        
        if(storedhash !== hash.toString('hex')){
            throw new BadRequestException('Incorect password!')
        }
        return user;
    }

    async validateFacebookUser(id: string): Promise<User> {
        const existingUser = await this.usersService.findOneByFacebookId(id);
        if(existingUser){
            return existingUser;
        }

        const newUserInfo: CreateUserDto = {
            sourceUID: id,
            source: UserSource.FACEBOOK,
        }

        return this.usersService.create(newUserInfo);
    }

    async validateGoogleUser(id: string): Promise<User> {
        const existingUser = await this.usersService.findOneByGoogleId(id);
        if(existingUser){
            return existingUser;
        }

        const newUserInfo: CreateUserDto = {
            sourceUID: id,
            source: UserSource.GOOGLE,
        }

        return this.usersService.create(newUserInfo);
    }

    async signup(userInfo: SignupUserDto) {

        if(userInfo.password1 !== userInfo.password2){
            throw new BadRequestException('Passwords are not similar!');
        }

        const existingUser = await this.usersService.findByEmail(userInfo.email);
        if(existingUser){
            throw new BadRequestException('Username already exists!');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(userInfo.password1, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        const newUser: CreateUserDto = {
            password: result,
            email: userInfo.email,
            source: UserSource.EMAIL
        }

        const user = await this.usersService.create(newUser);
        return user;
    }

    async login(user: User): Promise<Tokens> {
        const payload = { sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: "refresh token"
        }
    }
}
