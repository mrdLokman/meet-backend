import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/decorators';
import { Serialize } from 'src/interceptors';
import { AccountsService } from './accounts.service';
import { AccountDto, CreateAccountDto, UpdateAccountDto } from './dtos';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
@Serialize(AccountDto)
export class AccountsController {
    constructor(
        private readonly accountsService: AccountsService,
    ) {}

    
    @Post('')
    @ApiOperation({ summary: 'Create an account for the authenticated user' })
    @ApiCreatedResponse({
        description: 'Account Created',
        type: AccountDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect / User already has an account'
    })
    createAccount(@Body() payload: CreateAccountDto, @CurrentUser() user) {
        return this.accountsService.create(payload, user);
    }

    @Get('')
    @ApiOperation({ summary: 'Get all accounts' })
    @ApiOkResponse({
        description: 'Get All Accounts',
        type: [AccountDto],
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    findAllUsers() {
        return this.accountsService.findAll();
    }

    @Get('me')
    @ApiOperation({ summary: 'Get the authenticated user account' })
    @ApiCreatedResponse({
        description: 'Account Found',
        type: AccountDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiNotFoundResponse({
        description: 'Account not found'
    })
    async getMyAccount(@CurrentUser() user) {
        const account = await this.accountsService.findOneByUserId(user.id);

        if(!account){
            throw new NotFoundException('Account not fount');
        }
        return account;
    }

    @Patch('me')
    @ApiOperation({ summary: 'Update the authenticated user account' })
    @ApiOkResponse({
        description: 'Account updated',
        type: AccountDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin or doesnt have right to access)'
    })
    @ApiNotFoundResponse({
        description: 'Account not found'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    updateUser(@CurrentUser() user, @Body() updates: UpdateAccountDto) {
        return this.accountsService.update(user.id, updates);
    }

    @Delete('me')
    @ApiOperation({ summary: 'Delete the authenticated user account' })
    @ApiOkResponse({
        description: 'Account deleted',
        type: AccountDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiNotFoundResponse({
        description: 'Account not found'
    })
    deleteAccount(@CurrentUser() user) {
        return this.accountsService.delete(user.id);
    }
}
