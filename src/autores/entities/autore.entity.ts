import { IsEmail, IsNotEmpty } from "class-validator";
import { livros } from "../../generated/prisma/client.js";

export class autore {
    id: number;
    nome: string;
    idade: number
    email: string
    livros: livros[]
}
