import { PartialType } from '@nestjs/mapped-types';
import { CreateAutoreDto } from './create-autore.dto.js';

export class UpdateAutoreDto extends PartialType(CreateAutoreDto) {}
