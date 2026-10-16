import { ApiProperty } from '@nestjs/swagger';

export class LoginauthDto {
    @ApiProperty({ example: 'francisco@example.com' })
    email: string;

    @ApiProperty({ example: 'senha1234' })
    password: string;
}