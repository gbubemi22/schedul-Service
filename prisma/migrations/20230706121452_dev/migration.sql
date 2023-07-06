/*
  Warnings:

  - Added the required column `createdBy` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editedBy` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_editedById_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "editedBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
