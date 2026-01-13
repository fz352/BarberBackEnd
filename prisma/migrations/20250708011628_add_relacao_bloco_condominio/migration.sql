-- CreateTable
CREATE TABLE "Bloco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "numeroApartamentos" INTEGER NOT NULL,
    "condominioId" INTEGER NOT NULL,
    CONSTRAINT "Bloco_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "Condominio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
