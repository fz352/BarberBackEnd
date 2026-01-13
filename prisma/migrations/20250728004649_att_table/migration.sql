/*
  Warnings:

  - You are about to drop the column `cpfCnpj` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Pessoa` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CpfCnpj" TEXT,
    "nome" TEXT,
    "password" TEXT,
    "Cep" TEXT,
    "numero" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "Telefone" TEXT,
    "TipoPessoa" TEXT
);
INSERT INTO "new_Pessoa" ("id") SELECT "id" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_CpfCnpj_key" ON "Pessoa"("CpfCnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
