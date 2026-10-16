/*
  Warnings:

  - You are about to drop the `autor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "autor_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "autor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "autores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "autores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autorId" INTEGER NOT NULL,
    CONSTRAINT "livros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_livros" ("autorId", "descricao", "id", "titulo") SELECT "autorId", "descricao", "id", "titulo" FROM "livros";
DROP TABLE "livros";
ALTER TABLE "new_livros" RENAME TO "livros";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "autores_email_key" ON "autores"("email");
