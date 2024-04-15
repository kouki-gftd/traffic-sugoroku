/*
  Warnings:

  - You are about to drop the `Cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `city` on the `Rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerName]` on the table `Players` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityName` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cities";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PublicTransport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trafficCondition" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rooms" (
    "roomId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameMode" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "publicTransport" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("createdAt", "gameMode", "publicTransport", "roomId") SELECT "createdAt", "gameMode", "publicTransport", "roomId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Players_playerName_key" ON "Players"("playerName");
