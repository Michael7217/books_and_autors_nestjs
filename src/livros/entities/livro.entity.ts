import { autores } from "../../generated/prisma/client.js"

export class Livro {
    id: number
    titulo: string
    descricao: string
    autorId: number
    autor: autores
}
