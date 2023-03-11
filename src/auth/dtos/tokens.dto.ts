import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Tokens {
    
    @ApiProperty({description: 'access token',})
    @IsString()
    accessToken: string;

    @ApiProperty({description: 'refresh token',})
    @IsString()
    refreshToken: string;
}