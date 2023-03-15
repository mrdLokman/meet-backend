import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Serialize } from 'src/interceptors';
import { CreateIntrestDto, UpdateIntrestDto, IntrestDto } from './dtos';
import { IntrestsService } from './intrests.service';

@ApiTags('intrests')
@ApiBearerAuth()
@Controller('intrests')
@Serialize(IntrestDto)
export class IntrestsController {
    constructor(
        private readonly intrestsService: IntrestsService,
    ) {}

    
    @Post('')
    @ApiOperation({ summary: 'Create Intrest require admin role' })
    @ApiCreatedResponse({
        description: 'Intrest Created',
        type: IntrestDto,
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
    @UseGuards(AdminGuard)
    createIntrest(@Body() payload: CreateIntrestDto) {
        return this.intrestsService.create(payload);
    }

    @Get('')
    @ApiOperation({ summary: 'Gat all intrests' })
    @ApiOkResponse({
        description: 'Get All Intrests',
        type: [IntrestDto],
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    findAllIntrests() {
        return this.intrestsService.findAll();
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update Intrest by id require admin role' })
    @ApiOkResponse({
        description: 'User updated',
        type: IntrestDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
    })
    @ApiNotFoundResponse({
        description: 'Intrest not found'
    })
    @ApiBadRequestResponse({
        description: 'Payload incorrect'
    })
    @UseGuards(AdminGuard)
    updateIntrest(@Param('id') id: string, @Body() updates: UpdateIntrestDto) {
        return this.intrestsService.update(id, updates);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Intrest by id require admin role' })
    @ApiOkResponse({
        description: 'Intrest deleted',
        type: IntrestDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized(not loggedin)'
    })
    @ApiForbiddenResponse({
        description: 'Unauthorized(not admin)'
    })
    @ApiNotFoundResponse({
        description: 'Intrest not found'
    })
    @UseGuards(AdminGuard)
    deleteIntrest(@Param('id') id: string) {
        return this.intrestsService.delete(id);
    }
}
