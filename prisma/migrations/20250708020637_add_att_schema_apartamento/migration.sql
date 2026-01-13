/*
  Warnings:

  - You are about to drop the column `numero` on the `Apartamento` table. All the data in the column will be lost.
  - Added the required column `numeroApartamento` to the `Apartamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroDono` to the `Apartamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apartamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroApartamento" INTEGER NOT NULL,
    "numeroDono" TEXT NOT NULL,
    "blocoId" INTEGER NOT NULL,
    CONSTRAINT "Apartamento_blocoId_fkey" FOREIGN KEY ("blocoId") REFERENCES "Bloco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Apartamento" ("blocoId", "id") SELECT "blocoId", "id" FROM "Apartamento";
DROP TABLE "Apartamento";
ALTER TABLE "new_Apartamento" RENAME TO "Apartamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
