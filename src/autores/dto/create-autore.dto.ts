import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAutoreDto {
    @ApiProperty({example: 'franscisco silva'})
    @IsNotEmpty({message: "texto não pode sert vazio"})
    nome: string
    @ApiProperty({example: 20})
    idade: number
    @ApiProperty({example: 'fransciscosilva@gmail.com'})
    @IsEmail({}, {message: "email inválido"})
    email: string
}
