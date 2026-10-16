import { PartialType } from '@nestjs/swagger';
import { CreateLivroDto } from './create-livro.dto.js';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {}
