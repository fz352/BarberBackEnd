-- CreateTable
CREATE TABLE "Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfCnpj" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Pessoa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpfCnpj_key" ON "Pessoa"("cpfCnpj");
