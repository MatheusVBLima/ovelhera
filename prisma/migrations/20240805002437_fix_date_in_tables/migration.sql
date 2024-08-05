/*
  Warnings:

  - You are about to alter the column `date` on the `logsvengeance` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `date` on the `logsvideo` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logsvengeance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "enemy" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_logsvengeance" ("action", "date", "enemy", "id", "name") SELECT "action", "date", "enemy", "id", "name" FROM "logsvengeance";
DROP TABLE "logsvengeance";
ALTER TABLE "new_logsvengeance" RENAME TO "logsvengeance";
CREATE TABLE "new_logsvideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_logsvideo" ("action", "date", "id", "name", "url") SELECT "action", "date", "id", "name", "url" FROM "logsvideo";
DROP TABLE "logsvideo";
ALTER TABLE "new_logsvideo" RENAME TO "logsvideo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
