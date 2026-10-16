import { ApiProperty } from '@nestjs/swagger';

export class CreateLivroDto {
    @ApiProperty({ example: 'Dom Casmurro' })
    titulo: string

    @ApiProperty({ example: 'Romance de Machado de Assis' })
    descricao: string

    @ApiProperty({ type: Number, example: 1, description: 'ID do autor do livro' })
    autorId: number
}
