-- CreateTable
CREATE TABLE "UserPassword" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "registered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_picture" TEXT,
    "set_a" BOOLEAN NOT NULL DEFAULT true,
    "set_b" BOOLEAN NOT NULL DEFAULT true,
    "set_c" BOOLEAN NOT NULL DEFAULT false,
    "set_d" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "User_username_fkey" FOREIGN KEY ("username") REFERENCES "UserPassword" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("profile_picture", "registered", "set_a", "set_b", "set_c", "set_d", "username") SELECT "profile_picture", "registered", "set_a", "set_b", "set_c", "set_d", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
