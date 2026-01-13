/*
  Warnings:

  - You are about to drop the column `hashcode` on the `Apartamento` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfCnpj" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apartamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashCode" TEXT,
    "numeroApartamento" INTEGER NOT NULL,
    "numeroDono" TEXT NOT NULL,
    "nomeDono" TEXT NOT NULL,
    "blocoId" INTEGER NOT NULL,
    CONSTRAINT "Apartamento_blocoId_fkey" FOREIGN KEY ("blocoId") REFERENCES "Bloco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Apartamento" ("blocoId", "id", "nomeDono", "numeroApartamento", "numeroDono") SELECT "blocoId", "id", "nomeDono", "numeroApartamento", "numeroDono" FROM "Apartamento";
DROP TABLE "Apartamento";
ALTER TABLE "new_Apartamento" RENAME TO "Apartamento";
CREATE UNIQUE INDEX "Apartamento_hashCode_key" ON "Apartamento"("hashCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfCnpj_key" ON "User"("cpfCnpj");
