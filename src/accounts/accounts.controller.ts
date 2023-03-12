import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/decorators';
import { Serialize } from 'src/interceptors';
import { AccountsService } from './accounts.service';
import { AccountDto, CreateAccountDto } from './dtos';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
@UseGuards(JwtAuthGuard)
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
        payload.user = user;
        console.log(payload);
        return this.accountsService.create(payload);
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
}
