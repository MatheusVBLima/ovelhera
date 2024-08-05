/*
  Warnings:

  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "logs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "logsvideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "logsvengeance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "enemy" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
