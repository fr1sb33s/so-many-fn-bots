-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "num_real_players" INTEGER NOT NULL,
    "num_kills" INTEGER NOT NULL,
    "num_real_player_kills" INTEGER NOT NULL,
    "place" INTEGER NOT NULL,
    "created_on" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE INDEX "Game_created_on_idx" ON "Game"("created_on" DESC);
