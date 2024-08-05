-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
