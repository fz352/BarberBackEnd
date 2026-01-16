-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_telephone_key" ON "Users"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
