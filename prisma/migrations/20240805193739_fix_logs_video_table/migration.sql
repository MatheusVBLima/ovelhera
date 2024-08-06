/*
  Warnings:

  - Made the column `url` on table `logsvideo` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logsvideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TEXT NOT NULL
);
INSERT INTO "new_logsvideo" ("action", "date", "id", "name", "url") SELECT "action", "date", "id", "name", "url" FROM "logsvideo";
DROP TABLE "logsvideo";
ALTER TABLE "new_logsvideo" RENAME TO "logsvideo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
