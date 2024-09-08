/*
  Warnings:

  - You are about to drop the column `attachment` on the `Session` table. All the data in the column will be lost.
  - The `sessionDate` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "attachment",
DROP COLUMN "sessionDate",
ADD COLUMN     "sessionDate" TIMESTAMP(3);
