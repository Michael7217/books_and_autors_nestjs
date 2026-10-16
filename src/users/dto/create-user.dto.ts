import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({description:'nome do usuario', example: 'francisco silva'})
    nome: string
    @ApiProperty({description:'email do usuario', example: 'franciscosilva@gmail.com'})
    email: string
    @ApiProperty({description:'senha do usuario', example: '12345678', minLength: 8})
    password: string
}
