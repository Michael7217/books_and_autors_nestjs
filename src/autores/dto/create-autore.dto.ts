import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAutoreDto {
    @IsNotEmpty({message: "texto não pode sert vazio"})
    nome: string
    
    idade: number

    @IsEmail({}, {message: "email inválido"})
    email: string
}
