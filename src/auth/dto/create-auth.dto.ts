import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty({ description: 'Nome do usuário', example: 'Francisco Silva' })
    nome: string
	@ApiProperty({ description: 'Email do usuário', example: 'francisco@example.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Senha do usuário', example: 'senha1234', minLength: 8 })
	@IsString()
	@MinLength(8, {message: "8 caracteres no password"})
	password: string;
}
