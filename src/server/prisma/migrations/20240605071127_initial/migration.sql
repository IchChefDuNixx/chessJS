-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "registered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_picture" TEXT,
    "set_a" BOOLEAN NOT NULL DEFAULT true,
    "set_b" BOOLEAN NOT NULL DEFAULT true,
    "set_c" BOOLEAN NOT NULL DEFAULT false,
    "set_d" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player1" TEXT NOT NULL,
    "player2" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    CONSTRAINT "Game_player1_fkey" FOREIGN KEY ("player1") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_player2_fkey" FOREIGN KEY ("player2") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_winner_fkey" FOREIGN KEY ("winner") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
