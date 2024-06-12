/*
  Warnings:

  - You are about to drop the column `set_a` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `set_b` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `set_c` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `set_d` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "registered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_picture" TEXT,
    "showTooltips" BOOLEAN NOT NULL DEFAULT true,
    "darkMode" BOOLEAN NOT NULL DEFAULT true,
    "gender_min" REAL NOT NULL DEFAULT 40,
    "gender_max" REAL NOT NULL DEFAULT 60,
    "human" REAL NOT NULL DEFAULT 50,
    CONSTRAINT "User_username_fkey" FOREIGN KEY ("username") REFERENCES "UserPassword" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("profile_picture", "registered", "username") SELECT "profile_picture", "registered", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
