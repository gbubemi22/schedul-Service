/*
  Warnings:

  - Changed the type of `start_Date` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_Date` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "start_Date",
ADD COLUMN     "start_Date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_Date",
ADD COLUMN     "end_Date" TIMESTAMP(3) NOT NULL;
