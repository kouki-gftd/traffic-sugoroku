-- CreateTable
CREATE TABLE "Players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rooms" (
    "roomId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameMode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "publicTransport" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cities" (
    "cityId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cityName" TEXT NOT NULL,
    "line" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lines" (
    "lineId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationName" TEXT NOT NULL,
    "cityName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameModes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameMode" TEXT NOT NULL
);
