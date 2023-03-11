import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { Serialize } from 'src/interceptors';
import { UserDto, CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
@Serialize(UserDto)
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('')
    @ApiCreatedResponse({
        description: 'User Created',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    createUser(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }
    
    @Get('/:id')
    @ApiOkResponse({
        description: 'User found',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiNotFoundResponse({
        description: 'User not found'
    })
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOneById(id);

        if(!user){
            throw new NotFoundException('User not fount');
        }

        return user;
    }

    @Get('')
    @ApiOkResponse({
        description: 'Get All Users',
        type: [UserDto],
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Patch('/:id')
    @ApiOkResponse({
        description: 'User updated',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiNotFoundResponse({
        description: 'User not found'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    updateUser(@Param('id') id: string, @Body() updates: UpdateUserDto) {
        return this.usersService.update(id, updates);
    }


    @Delete('/:id')
    @ApiOkResponse({
        description: 'User deleted',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiNotFoundResponse({
        description: 'User not found'
    })
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
