import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Serialize } from 'src/interceptors';
import { UserDto, CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AdminGuard)
@Serialize(UserDto)
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('')
    @ApiOperation({ summary: 'Create User require admin role' })
    @ApiCreatedResponse({
        description: 'User Created',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    createUser(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Get User by id require admin role' })
    @ApiOkResponse({
        description: 'User found',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
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
    @ApiOperation({ summary: 'Gat all Users require admin role' })
    @ApiOkResponse({
        description: 'Get All Users',
        type: [UserDto],
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
    })
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update User by id require admin role' })
    @ApiOkResponse({
        description: 'User updated',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
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
    @ApiOperation({ summary: 'Delete User by id require admin role' })
    @ApiOkResponse({
        description: 'User deleted',
        type: UserDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
    })
    @ApiNotFoundResponse({
        description: 'User not found'
    })
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
