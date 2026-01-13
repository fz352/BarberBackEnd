/*
  Warnings:

  - Made the column `cpfCnpj` on table `Pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Pessoa` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfCnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cep" TEXT,
    "numero" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "telefone" TEXT,
    "habilitacao" TEXT,
    "tipoPessoa" TEXT
);
INSERT INTO "new_Pessoa" ("bairro", "cep", "cidade", "complemento", "cpfCnpj", "estado", "habilitacao", "id", "nome", "numero", "password", "telefone", "tipoPessoa") SELECT "bairro", "cep", "cidade", "complemento", "cpfCnpj", "estado", "habilitacao", "id", "nome", "numero", "password", "telefone", "tipoPessoa" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_cpfCnpj_key" ON "Pessoa"("cpfCnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
