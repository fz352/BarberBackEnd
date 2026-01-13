/*
  Warnings:

  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Empresa_cnpj_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Empresa";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfCnpj" INTEGER NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Pessoa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pessoa" ("cpfCnpj", "endereco", "id", "userId") SELECT "cpfCnpj", "endereco", "id", "userId" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_cpfCnpj_key" ON "Pessoa"("cpfCnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
