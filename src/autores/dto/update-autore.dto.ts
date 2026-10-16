import { PartialType } from '@nestjs/mapped-types';
import { CreateAutoreDto } from './create-autore.dto.js';
import { DeepPartialType } from '@nestjs/swagger'; //funciona igual ao PartialType, documenta o body de acordo com o createdto

export class UpdateAutoreDto extends DeepPartialType(CreateAutoreDto) {}
