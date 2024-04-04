-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Players" ("id", "playerName") SELECT "id", "playerName" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
CREATE TABLE "new_Rooms" (
    "roomId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameMode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "publicTransport" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("city", "gameMode", "publicTransport", "roomId") SELECT "city", "gameMode", "publicTransport", "roomId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
