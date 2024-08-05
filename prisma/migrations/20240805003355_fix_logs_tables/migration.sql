-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logsvengeance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "enemy" TEXT NOT NULL,
    "date" TEXT NOT NULL
);
INSERT INTO "new_logsvengeance" ("action", "date", "enemy", "id", "name") SELECT "action", "date", "enemy", "id", "name" FROM "logsvengeance";
DROP TABLE "logsvengeance";
ALTER TABLE "new_logsvengeance" RENAME TO "logsvengeance";
CREATE TABLE "new_logsvideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT,
    "date" TEXT NOT NULL
);
INSERT INTO "new_logsvideo" ("action", "date", "id", "name", "url") SELECT "action", "date", "id", "name", "url" FROM "logsvideo";
DROP TABLE "logsvideo";
ALTER TABLE "new_logsvideo" RENAME TO "logsvideo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
