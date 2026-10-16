import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto.js';

export class UpdateAuthDto extends PartialType(CreateAuthDto){}
