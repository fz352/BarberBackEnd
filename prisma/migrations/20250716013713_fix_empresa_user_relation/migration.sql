/*
  Warnings:

  - You are about to drop the `Apartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bloco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Condominio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cpfCnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Apartamento_hashCode_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Apartamento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bloco";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Condominio";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");
