/*
  Warnings:

  - You are about to drop the column `Cep` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `CpfCnpj` on the `Pessoa` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfCnpj" TEXT,
    "nome" TEXT,
    "password" TEXT,
    "cep" TEXT,
    "numero" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "Telefone" TEXT,
    "TipoPessoa" TEXT
);
INSERT INTO "new_Pessoa" ("Telefone", "TipoPessoa", "bairro", "cidade", "complemento", "estado", "id", "nome", "numero", "password") SELECT "Telefone", "TipoPessoa", "bairro", "cidade", "complemento", "estado", "id", "nome", "numero", "password" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_cpfCnpj_key" ON "Pessoa"("cpfCnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
