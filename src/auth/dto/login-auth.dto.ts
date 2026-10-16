import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "./create-auth.dto.js";

export class LoginauthDto {
    email: string;
    password: string;
}