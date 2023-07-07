/*
  Warnings:

  - You are about to drop the column `createdById` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `editedById` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "createdById",
DROP COLUMN "editedById";
