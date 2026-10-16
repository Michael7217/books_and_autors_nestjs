import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { DeepPartialType } from '@nestjs/swagger';

export class UpdateUserDto extends DeepPartialType(CreateUserDto) {}
