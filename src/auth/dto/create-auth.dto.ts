import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
    nome: string
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8, {message: "8 caracteres no password"})
	password: string;
}
