/*
  Warnings:

  - Added the required column `userId` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "livros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autores" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "livros_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_livros" ("autorId", "descricao", "id", "titulo") SELECT "autorId", "descricao", "id", "titulo" FROM "livros";
DROP TABLE "livros";
ALTER TABLE "new_livros" RENAME TO "livros";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
