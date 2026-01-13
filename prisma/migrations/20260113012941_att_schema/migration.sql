/*
  Warnings:

  - You are about to drop the column `DateTimeEnvio` on the `Notifications` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTimeCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telephone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "DateTimeSend" DATETIME
);
INSERT INTO "new_Notifications" ("dateTimeCreated", "id", "status", "telephone", "text") SELECT "dateTimeCreated", "id", "status", "telephone", "text" FROM "Notifications";
DROP TABLE "Notifications";
ALTER TABLE "new_Notifications" RENAME TO "Notifications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
