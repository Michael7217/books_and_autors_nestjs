import { autor } from "../../generated/prisma/client.js"

export class Livro {
    id: number
    titulo: string
    descricao: string
    autorId: number
    autor: autor
}
