import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { Serialize } from 'src/interceptors';
import { UserDto, CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('')
    createUser(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }
    
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOneById(id);

        if(!user){
            throw new NotFoundException('User not fount');
        }

        return user;
    }

    @Get()
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updates: UpdateUserDto) {
        return this.usersService.update(id, updates);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
