-- CreateTable
CREATE TABLE "VerificationCode" (
    "telephone" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "VerificationCode_telephone_fkey" FOREIGN KEY ("telephone") REFERENCES "Users" ("telephone") ON DELETE RESTRICT ON UPDATE CASCADE
);
