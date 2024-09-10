/*
  Warnings:

  - You are about to drop the column `content` on the `EmailSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `EmailSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `toEmail` on the `EmailSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailSchedule" DROP COLUMN "content",
DROP COLUMN "subject",
DROP COLUMN "toEmail";
