/*
  Warnings:

  - You are about to drop the column `issueDate` on the `CashMovement` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CashMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "financialOperation" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cashRegisterId" TEXT NOT NULL,
    CONSTRAINT "CashMovement_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "CashRegister" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CashMovement" ("amount", "cashRegisterId", "createdAt", "financialOperation", "id", "notes") SELECT "amount", "cashRegisterId", "createdAt", "financialOperation", "id", "notes" FROM "CashMovement";
DROP TABLE "CashMovement";
ALTER TABLE "new_CashMovement" RENAME TO "CashMovement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
