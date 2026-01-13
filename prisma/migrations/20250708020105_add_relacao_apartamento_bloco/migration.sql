-- CreateTable
CREATE TABLE "Apartamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "blocoId" INTEGER NOT NULL,
    CONSTRAINT "Apartamento_blocoId_fkey" FOREIGN KEY ("blocoId") REFERENCES "Bloco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
